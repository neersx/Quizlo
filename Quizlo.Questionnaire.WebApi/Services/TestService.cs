using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.Data;
using Quizlo.Questionnaire.WebApi.Helpers;
using Quizlo.Questionnaire.WebApi.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.WebUtilities;
using System.Text.Json;
using Newtonsoft.Json;

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

    public async Task<TestDetailsDto> CreateTestAsync(CreateTestRequest req, int userId,
                                                      CancellationToken ct = default)
    {
        // 1. Verify exam exists
        var exam = await _db.Exams.AsNoTracking()
                                  .FirstOrDefaultAsync(e => e.Id == req.ExamId, ct)
                     ?? throw new KeyNotFoundException($"Exam {req.ExamId} not found");

        // 2. Insert the Test shell so we get the TestId
        var test = new Test
        {
            ExamId = exam.Id,
            Title = req.Title ?? $"{exam.Name} Mock Test",
            Duration = req.Duration ?? TimeSpan.FromMinutes(exam.Tests?.Max(t => t.Duration.HasValue ? t.Duration.Value.TotalMinutes : 0) ?? 120),
            DurationCompltedIn = TimeSpan.Zero,
            Subject = req.Subject,
            Language = req.Language ?? "English",
            CreatedAt = DateTime.UtcNow,
            CreatedByUserId = userId
        };

        _db.Tests.Add(test);
        await _db.SaveChangesAsync(ct);

        // 3. Ask n8n to generate questions ──────────────────────────────────────────
        string raw = await GetAIGeneratedQuestions(test,exam, req, ct);


        if (string.IsNullOrWhiteSpace(raw))
        {
            _log.LogError("n8n webhook returned an empty body");
            throw new ApplicationException("n8n returned empty response");
        }

        _log.LogDebug("Raw n8n response: {Json}", raw);
        var opts = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var envelope = System.Text.Json.JsonSerializer.Deserialize<N8nResponseDto>(raw, opts)
                      ?? new N8nResponseDto();

        // This is the list we’ll persist
        var n8n = envelope.Questions!;


        // 4-a  Build the Question entities
        var questions = n8n.Select(q => new Question
        {
            QuestionText = q.QuestionText,
            Options = q.Options,
            OptionsJson = JsonConvert.SerializeObject(q.Options),        // ← keep if you store JSON
            CorrectOptionIds = q.CorrectOptionIds,                            // already CSV?
            Difficulty = (DifficultyLevel)(int)Enum.Parse<DifficultyLevel>(q.Difficulty, true),
            Explanation = q.Explanation,
            Type = q.IsMultipleSelect ? QuestionType.Multiple : QuestionType.Single
        }).ToList();

        // 4-b  Bulk-insert Questions
        await _db.Questions.AddRangeAsync(questions, ct);
        await _db.SaveChangesAsync(ct);      

        // 4-c  Build the TestQuestion link table
        var testQuestions = questions.Select((question, idx) => new TestQuestion
        {
            TestId = test.Id,                     
            QuestionId = question.Id,
            Order = n8n[idx].QuestionNo 
        }).ToList();

        // 4-d  Bulk-insert TestQuestions
        await _db.TestQuestions.AddRangeAsync(testQuestions, ct);
        await _db.SaveChangesAsync(ct);           // commit the link rows



        // 5. Load back + map to response DTO
        return await GetTestAsync(test.Id, ct) ??
               throw new InvalidOperationException("Test not found after creation");
    }

    private async Task<string> GetAIGeneratedQuestions(Test test, Exam exam, CreateTestRequest req, CancellationToken ct)
    {
        var client = _http.CreateClient();
        client.DefaultRequestHeaders.Accept.ParseAdd("application/json"); // hint

        var query = new Dictionary<string, string?>
        {
            ["examName"] = exam.Name,
            ["examCode"] = exam.Code,
            ["numberOfQuestions"] = req.NumberOfQuestions.ToString() ?? "",
            ["difficultyLevel"] = req.Difficulty.ToString() ?? "Mix",
            ["subject"] = test.Subject ?? "All",
            ["language"] = test.Language,
            ["testId"] = "1",
            ["examId"] = exam.Id.ToString(),
            ["testTitle"] = test.Title,
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
