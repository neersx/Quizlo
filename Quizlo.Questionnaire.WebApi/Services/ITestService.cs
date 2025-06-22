using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.Data;
using Quizlo.Questionnaire.WebApi.Helpers;
using Quizlo.Questionnaire.WebApi.DTO;
using Microsoft.EntityFrameworkCore;

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
            Duration = req.Duration ?? TimeSpan.FromMinutes(exam.Tests?.Max(t => (int)t.Duration.TotalMinutes) ?? 120),
            DurationCompltedIn = TimeSpan.Zero,
            Subject = req.Subject,
            Language = req.Language ?? "English",
            CreatedAt = DateTime.UtcNow,
            CreatedByUserId = userId
        };
        _db.Tests.Add(test);
        await _db.SaveChangesAsync(ct);   // Test.Id materialised

        // 3. Ask n8n to generate questions
        var client = _http.CreateClient();
        var payload = new
        {
            examName = exam.Name,
            examCode = exam.Code,
            language = test.Language,
            subject = test.Subject,
            numberOfQuestions = req.NumberOfQuestions,
            difficultyLevel = req.Difficulty.ToString()
        };

        _log.LogInformation("Calling n8n webhook {Url}", _webhookUrl);
        using var resp = await client.PostAsJsonAsync(_webhookUrl, payload, ct);
        resp.EnsureSuccessStatusCode();

        var n8n = await resp.Content.ReadFromJsonAsync<N8nQuestionDto[]>(cancellationToken: ct)
                  ?? Array.Empty<N8nQuestionDto>();

        // 4. Persist questions + link table
        foreach (var q in n8n)
        {
            var entity = new Question
            {
                QuestionText = q.Question,
                Options = q.Options,
                CorrectOptionIds = string.Join(',', q.CorrectOption),
                Explanation = q.Explanation,
                Difficulty = Enum.TryParse<DifficultyLevel>(q.Complexity, true, out var d) ? d : req.Difficulty,
                Type = QuestionType.Single // map if needed
            };
            _db.Questions.Add(entity);
            await _db.SaveChangesAsync(ct);  // Question.Id

            _db.TestQuestions.Add(new TestQuestion
            {
                TestId = test.Id,
                QuestionId = entity.Id,
                Order = q.QuestionNo
            });
        }

        await _db.SaveChangesAsync(ct);

        // 5. Load back + map to response DTO
        return await GetTestAsync(test.Id, ct) ??
               throw new InvalidOperationException("Test not found after creation");
    }

    public async Task<TestDetailsDto?> GetTestAsync(int id, CancellationToken ct = default)
        => await _db.Tests
                    .AsNoTracking()
                    .Include(t => t.Exam)
                    .Include(t => t.TestQuestions)
                        .ThenInclude(tq => tq.Question)
                    .Where(t => t.Id == id)
                    .Select(t => new TestDetailsDto
                    {
                        Id = t.Id,
                        Title = t.Title,
                        Duration = t.Duration,
                        CreatedAt = t.CreatedAt,
                        ExamId = t.ExamId,
                        ExamName = t.Exam.Name,
                        Questions = t.TestQuestions
                                     .OrderBy(tq => tq.Order)
                                     .Select(tq => tq.Question)
                                     .Select(q => new QuestionDto
                                     {
                                         Id = q.Id,
                                         QuestionText = q.QuestionText,
                                         Options = q.Options,
                                         CorrectOption = q.CorrectOptionIds.Split(',', StringSplitOptions.RemoveEmptyEntries),
                                         Explanation = q.Explanation,
                                         Difficulty = q.Difficulty
                                     })
                                     .ToList()
                    })
                    .FirstOrDefaultAsync(ct);
}
