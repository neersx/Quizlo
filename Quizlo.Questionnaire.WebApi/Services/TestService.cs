using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.Data;
using Quizlo.Questionnaire.WebApi.Helpers;
using Quizlo.Questionnaire.WebApi.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.WebUtilities;
using System.Text.Json;
using Newtonsoft.Json;
using System.Data;

public interface ITestService
{
    Task<TestDetailsDto> CreateTestAsync(CreateTestRequest request, int createdByUserId,
                                         CancellationToken ct = default);

    Task<TestDetailsDto?> GetTestAsync(int id, CancellationToken ct = default);
}

public class TestService : ITestService
{
    private readonly QuizDbContext _db;
    private readonly IHttpClientFactory _http;
    private readonly ILogger<TestService> _log;
    private readonly string _webhookUrl;

    public TestService(QuizDbContext db,
                       IHttpClientFactory http,
                       IConfiguration cfg,
                       ILogger<TestService> log)
    {
        _db = db;
        _http = http;
        _log = log;
        _webhookUrl = cfg["N8n:WebhookUrl"]!; // -> appsettings.json
    }


    public async Task<TestDetailsDto> CreateTestAsync(
        CreateTestRequest req, int userId, CancellationToken ct = default)
    {
        //------------------------------------------------------------------
        // 1)   Get *all* data you need BEFORE you open a DB transaction
        //------------------------------------------------------------------
        var exam = await _db.Exams.AsNoTracking()
                                  .FirstOrDefaultAsync(e => e.Id == req.ExamId, ct)
                   ?? throw new KeyNotFoundException($"Exam {req.ExamId} not found");

        // ── remote call to n8n ────────────────────────────────────────────
        string raw = await GetAIGeneratedQuestions(exam, req, ct);
        var env = System.Text.Json.JsonSerializer.Deserialize<N8nResponseDto>(raw,
                      new JsonSerializerOptions { PropertyNameCaseInsensitive = true })
                   ?? throw new ApplicationException("Empty n8n response");

        var aiQuestions = env.Questions!;               // short alias

        //------------------------------------------------------------------
        // 2)   Map AI objects → EF entities (pure in-memory work)
        //------------------------------------------------------------------
        var test = new Test
        {
            ExamId = exam.Id,
            Title = req.Title ?? $"{exam.Name} Mock Test",
            Duration = TimeSpan.FromMinutes(env.TotalTimeToAnswer),
            DurationCompltedIn = TimeSpan.Zero,
            Subject = req.Subject ?? "All",
            Language = req.Language ?? "English",
            CreatedAt = DateTime.UtcNow,
            CreatedByUserId = userId
        };

        var questions = aiQuestions.Select(q => new Question
        {
            QuestionText = q.QuestionText,
            Options = q.Options,    
            OptionsJson = JsonConvert.SerializeObject(q.Options), // ↔ OptionsJson
            CorrectOptionIds = q.CorrectOptionIds,
            Explanation = q.Explanation,
            Type = q.IsMultipleSelect
                                    ? QuestionType.Multiple
                                    : QuestionType.Single,
            Difficulty = Enum.Parse<DifficultyLevel>(q.Difficulty, true)
        }).ToList();


        //------------------------------------------------------------------
        // 3)   One *resilient* transaction for every INSERT
        //------------------------------------------------------------------
        var strategy = _db.Database.CreateExecutionStrategy();   // has built-in retries

        return await strategy.ExecuteAsync(async () =>
        {
            // any dead-lock / transient SQL error => the whole lambda is rerun
            await using var tx =
                await _db.Database.BeginTransactionAsync(IsolationLevel.ReadCommitted, ct);

            try
            {
                //------------------------------------------------------------------
                // 3-A  Insert the Test  ➜ we need its identity for TestQuestions
                //------------------------------------------------------------------
                _db.Tests.Add(test);
                await _db.SaveChangesAsync(ct);               // generates test.Id

                //------------------------------------------------------------------
                // 3-B  Insert all Questions
                //------------------------------------------------------------------
                _db.Questions.AddRange(questions);
                await _db.SaveChangesAsync(ct);               // gets question.Id’s

                //------------------------------------------------------------------
                // 3-C  Link table rows
                //------------------------------------------------------------------
                var links = questions.Select((q, i) => new TestQuestion
                {
                    TestId = test.Id,
                    QuestionId = q.Id,
                    Order = aiQuestions[i].QuestionNo
                });

                _db.TestQuestions.AddRange(links);
                await _db.SaveChangesAsync(ct);

                //------------------------------------------------------------------
                await tx.CommitAsync(ct);                     // <-- atomic commit
            }
            catch   // *any* exception => rollback + re-throw
            {
                await tx.RollbackAsync(ct);
                throw;
            }

            // we are still inside the execution-strategy delegate
            return await GetTestAsync(test.Id, ct);
        });
    }


    private async Task<string> GetAIGeneratedQuestions( Exam exam, CreateTestRequest req, CancellationToken ct)
    {
        var client = _http.CreateClient();
        client.DefaultRequestHeaders.Accept.ParseAdd("application/json"); // hint

        var query = new Dictionary<string, string?>
        {
            ["examName"] = exam.Name,
            ["examCode"] = exam.Code,
            ["numberOfQuestions"] = req.NumberOfQuestions.ToString() ?? "",
            ["difficultyLevel"] = req.Difficulty.ToString() ?? "Mix",
            ["subject"] = req.Subject ?? "All",
            ["language"] = req.Language,
            ["testId"] = "1",
            ["examId"] = exam.Id.ToString(),
            ["testTitle"] = req.Title,
        };

        var webhookUrl = QueryHelpers.AddQueryString(_webhookUrl, query);
        _log.LogInformation("Calling n8n webhook {Url}", webhookUrl);

        using var resp = await client.GetAsync(webhookUrl, ct);
        resp.EnsureSuccessStatusCode();

        return await resp.Content.ReadAsStringAsync(ct);
    }

    // Update the mapping of Difficulty property in the GetTestAsync method to convert DifficultyLevel to string.
    public async Task<TestDetailsDto?> GetTestAsync(int id, CancellationToken ct = default)
    {
        return await _db.Tests
                        .AsNoTracking()
                        .Include(t => t.Exam)
                        .Include(t => t.TestQuestions)
                            .ThenInclude(tq => tq.Question)
                        .Where(t => t.Id == id)
                        .Select(t => new TestDetailsDto
                        {
                            Id = t.Id,
                            Title = t.Title,
                            Duration = (TimeSpan)t.Duration,
                            CreatedAt = t.CreatedAt,
                            ExamId = t.ExamId,
                            Subject = t.Subject,
                            Language = t.Language,
                            ExamName = t.Exam.Name,
                            Questions = t.TestQuestions
                                         .OrderBy(tq => tq.Order)
                                         .Select(tq => new QuestionDto
                                         {
                                             Id = tq.Question.Id,
                                             QuestionText = tq.Question.QuestionText,
                                             QuestionNo = tq.Order,
                                             Options = tq.Question.Options,
                                             CorrectOptionIds = tq.Question.CorrectOptionIds,
                                             Explanation = tq.Question.Explanation,
                                             Difficulty = tq.Question.Difficulty.ToString() // Convert DifficultyLevel to string  
                                         })
                                         .ToList()
                        })
                        .FirstOrDefaultAsync(ct);
    }
}
