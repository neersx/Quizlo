using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.Data;
using Quizlo.Questionnaire.WebApi.Helpers;
using Quizlo.Questionnaire.WebApi.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.WebUtilities;
using System.Text.Json;
using Newtonsoft.Json;
using System.Data;
using Quizlo.Questionnaire.WebApi.Helpers.Constants;
using AutoMapper;

public interface ITestService
{

    Task<IReadOnlyList<TestDetailsDto>> GetUserTestsAsync(int userId, CancellationToken ct = default);
    Task<TestDetailsDto> CreateTestAsync(CreateTestRequest request, int userId, CancellationToken ct = default);
    Task<TestDetailsDto> CreateInitialTestAsync(CreateTestRequest req, int userId, CancellationToken ct = default);
    Task<IReadOnlyList<QuestionDto>> GetTestQuestionsAsync(CreateTestRequest req, CancellationToken ct = default);
    Task<TestDetailsDto> GetQuestionsByTestIdAsync(int testId, CancellationToken ct = default);
    Task<TestDetailsDto?> GetTestAsync(int id, CancellationToken ct = default);
    Task<TestDetailsDto?> GetTestInfoAsync(int id, CancellationToken ct = default);

    Task<TestResultDto> GetTestResultAsync(int id, CancellationToken ct = default);

    Task<IReadOnlyList<TestDetailsDto>> GetUserActiveTestsAsync(int userId, CancellationToken ct = default);

    Task<TestSubmissionResultDto> SubmitAnswersAsync(int testId, SubmitTestAnswersRequest request, CancellationToken ct = default);
}

public class TestService : ITestService
{
    private readonly QuizDbContext _db;
    private readonly IHttpClientFactory _http;
    private readonly ILogger<TestService> _log;
    private readonly string _webhookUrl;
    private const int MaxRetries = 3;
    private readonly IMapper _mapper;

    public TestService(QuizDbContext db,
                       IHttpClientFactory http,
                       IConfiguration cfg,
                       IMapper mapper,
                       ILogger<TestService> log)
    {
        _db = db;
        _http = http;
        _mapper = mapper;
        _log = log;
        _webhookUrl = $"{cfg["N8n:WebhookBaseUrl"]!}/generate-live-question";  // -> appsettings.json
    }

    /// <summary>All tests that belong to one user, most-recent first.</summary>
    public async Task<IReadOnlyList<TestDetailsDto>> GetUserTestsAsync(int userId, CancellationToken ct = default)
    {
        // NB: projection happens in SQL, so only the needed columns travel over the wire
        return await _db.Tests
            .AsNoTracking()
            .Include(x => x.Exam)
            .Where(t => t.CreatedByUserId == userId)
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => new TestDetailsDto
            {
                Id = t.Id,
                Title = t.Title,
                Language = t.Language,
                Subject = t.Subject,
                SubjectId = t.Exam.Subjects.FirstOrDefault(x => x.Title == t.Subject).Id,
                Duration = (TimeSpan)t.Duration,
                DurationCompltedIn = t.DurationCompltedIn,
                CreatedAt = t.CreatedAt,
                ExamId = t.ExamId,
                TotalQuestions = t.TestQuestions.Count,   // COUNT(*) in SQL
                TotalMarks = t.TotalMarks,
                MarksScored = t.MarksScored,
                ExamName = t.Exam.Name,
                ExamCode = t.Exam.Code,
                Status = t.Status
            }).ToListAsync(ct);
    }

    public async Task<IReadOnlyList<TestDetailsDto>> GetUserActiveTestsAsync(int userId, CancellationToken ct = default)
    {
        return await _db.Tests.AsNoTracking().Include(x => x.Exam).Where(t => t.CreatedByUserId == userId && t.Status == TestStatus.NotStarted)
                        .Select(t => new TestDetailsDto
                        {
                            Id = t.Id,
                            Title = t.Title,
                            Language = t.Language,
                            Subject = t.Subject,
                            SubjectId = t.Exam.Subjects.FirstOrDefault(x => x.Title == t.Subject).Id,
                            Duration = (TimeSpan)t.Duration,
                            DurationCompltedIn = t.DurationCompltedIn,
                            CreatedAt = t.CreatedAt,
                            ExamId = t.ExamId,
                            TotalQuestions = t.TestQuestions.Count,   // COUNT(*) in SQL
                            TotalMarks = t.TotalMarks,
                            MarksScored = t.MarksScored,
                            ExamName = t.Exam.Name,
                            ExamCode = t.Exam.Code,
                            Status = t.Status
                        }).ToListAsync(ct);
    }

    public async Task<IReadOnlyList<QuestionDto>> GetTestQuestionsAsync(CreateTestRequest req, CancellationToken ct = default)
    {
        if (req.Id == null)
            throw new ArgumentNullException(nameof(req.Id));

        if (req.HasAiQuestions)
        {
            var env = await GetAIGeneratedQuestions(req, ct);
            return env.Questions!;
        }
        else
        {
            var testQuestions = await GetTestAsync(req.Id, ct);
            return testQuestions.Questions!;
        }
    }

    public async Task<TestDetailsDto> GetQuestionsByTestIdAsync(int testId, CancellationToken ct = default)
    {
        if (testId == 0)
            throw new ArgumentNullException(nameof(testId));

        TestDetailsDto test = await GetTestAsync(testId, ct);

        int subjectId = (int)test.SubjectId;

        if (test == null)
            throw new ArgumentNullException(nameof(test));

        if (test.Questions.Count > 0)
            return test;
        else
        {
            var env = await GetAIGeneratedQuestions(test, subjectId, ct);
            if (env.Questions.Count > 0)
            {
                test.Questions = env.Questions;
                test.TotalQuestions = env.Questions.Count;
                test.TotalMarks = env.Questions.Count * 3;
                test.Duration = TimeSpan.FromMinutes(env.Questions.Count * 2);
                return await UpdateTestDetailsAsync(test, subjectId, ct);
            }
            throw new ArgumentNullException(nameof(test.Questions));
        }
    }

    private async Task<TestDetailsDto> UpdateTestDetailsAsync(TestDetailsDto testDetails, int subjectId, CancellationToken ct = default)
    {
        for (var attempt = 1; attempt <= MaxRetries; attempt++)
        {
            await using var tx = await _db.Database.BeginTransactionAsync(ct);

            var test = await _db.Tests.Include(t => t.TestQuestions).ThenInclude(tq => tq.Question)
                                .FirstOrDefaultAsync(t => t.Id == testDetails.Id, ct)
                                ?? throw new KeyNotFoundException($"Test {testDetails.Id} not found.");

            #region --------- AddQuestions to the Questions Hub and TestQuestions ------------

            var hubs = new List<QuestionsHub>(testDetails.Questions.Count);
            var testQuestions = new List<TestQuestion>(testDetails.Questions.Count);

            foreach (var dto in testDetails.Questions)
            {
                var question = new Question
                {
                    QuestionText = dto.QuestionText,
                    Options = dto.Options,
                    OptionsJson = dto.OptionsJson,
                    Type = dto.IsMultipleSelect ? QuestionType.Multiple : QuestionType.Single,
                    Difficulty = Enum.Parse<DifficultyLevel>(dto.Difficulty, true),
                    Explanation = dto.Explanation,
                    CorrectOptionIds = dto.CorrectOptionIds,
                    Marks = dto.Marks,
                    MinusMarks = dto.MinusMarks,
                };

                // Enforce Multiple type if DTO says it's multi-select
                if (dto.IsMultipleSelect && question.Type != QuestionType.Multiple)
                    question.Type = QuestionType.Multiple;

                hubs.Add(new QuestionsHub
                {
                    ExamId = testDetails.ExamId,
                    SubjectId = subjectId,
                    Question = question, // EF will insert Question then Hub automatically
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = 1,
                    IsActive = true,
                    Difficulty = dto.Difficulty ?? question.Difficulty.ToString()
                });

                testQuestions.Add(new TestQuestion
                {
                    TestId = test.Id,
                    Question = question,
                    Order = dto.QuestionNo
                });
            }

            _db.QuestionsHubs.AddRange(hubs);
            await _db.SaveChangesAsync(ct);

            _db.TestQuestions.AddRange(testQuestions);
            await _db.SaveChangesAsync(ct);

            #endregion

            test.Status = TestStatus.Started;
            test.TotalQuestions = testDetails.TotalQuestions;
            test.TotalMarks = testDetails.TotalMarks;
            test.Duration = testDetails.Duration;

            await _db.SaveChangesAsync(ct);
            await tx.CommitAsync(ct);

            var testDto = _mapper.Map<TestDetailsDto>(test);
            testDto.Questions = testDetails.Questions;

            return testDto;

        }

        return testDetails;
    }

    public async Task<TestDetailsDto> CreateTestAsync(CreateTestRequest req, int userId, CancellationToken ct = default)
    {
        //------------------------------------------------------------------
        // 1)   Get *all* data you need BEFORE you open a DB transaction
        //------------------------------------------------------------------
        var exam = await _db.Exams.AsNoTracking()
                                  .FirstOrDefaultAsync(e => e.Id == req.ExamId, ct)
                   ?? throw new KeyNotFoundException($"Exam {req.ExamId} not found");

        // ── remote call to n8n ────────────────────────────────────────────
        var env = await GetAIGeneratedQuestions(req, ct);
        var aiQuestions = env.Questions!;               // short alias

        //------------------------------------------------------------------
        // 2)   Map AI objects → EF entities (pure in-memory work)
        //------------------------------------------------------------------
        var test = new Test
        {
            ExamId = exam.Id,
            Title = req.Title,
            Duration = TimeSpan.FromMinutes(env.TotalTimeToAnswer),
            DurationCompltedIn = TimeSpan.Zero,
            Subject = req.Subject ?? "All",
            Language = req.Language ?? "English",
            CreatedAt = DateTime.UtcNow,
            CreatedByUserId = userId,
            Status = TestStatus.NotStarted,
            TotalMarks = env.TotalMarks
        };

        var questions = aiQuestions.Select(q => new Question
        {
            QuestionText = q.QuestionText,
            Options = q.Options,
            OptionsJson = JsonConvert.SerializeObject(q.Options), // ↔ OptionsJson
            CorrectOptionIds = q.CorrectOptionIds,
            Explanation = q.Explanation,
            Marks = q.Marks,
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
                // 3-A  Insert the Test  ➜ we need its identity for TestQuestions
                //------------------------------------------------------------------
                _db.Tests.Add(test);
                await _db.SaveChangesAsync(ct);               // generates test.Id

                // 3-B  Insert all Questions
                //------------------------------------------------------------------
                _db.Questions.AddRange(questions);
                await _db.SaveChangesAsync(ct);               // gets question.Id’s

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
            catch
            {
                await tx.RollbackAsync(ct);
                throw;
            }

            // we are still inside the execution-strategy delegate
            return await GetTestAsync(test.Id, ct);
        });
    }


    public async Task<TestDetailsDto> CreateInitialTestAsync(CreateTestRequest req, int userId, CancellationToken ct = default)
    {
        var exam = await _db.Exams.AsNoTracking().FirstOrDefaultAsync(e => e.Id == req.ExamId, ct)
            ?? throw new KeyNotFoundException($"Exam {req.ExamCode} was not found");

        var test = new Test
        {
            ExamId = exam.Id,
            Title = req.Title,
            Duration = TimeSpan.FromMinutes(req.TotalQuestions * 2 ?? 40),
            DurationCompltedIn = TimeSpan.Zero,
            Subject = req.Subject ?? "All",
            Language = req.Language ?? "English",
            CreatedAt = DateTime.UtcNow,
            TotalQuestions = req.TotalQuestions,
            CreatedByUserId = userId,
            Status = TestStatus.NotStarted,
            TotalMarks = req.TotalQuestions * 3
        };

        await _db.Tests.AddAsync(test, ct);
        await _db.SaveChangesAsync(ct);

        return _mapper.Map<TestDetailsDto>(test);

    }

    private async Task<N8nResponseDto> GetAIGeneratedQuestions(CreateTestRequest req, CancellationToken ct)
    {
        var client = _http.CreateClient();
        client.DefaultRequestHeaders.Accept.ParseAdd("application/json"); // hint

        var query = new Dictionary<string, string?>
        {
            ["examName"] = req.ExamName,
            ["examCode"] = req.ExamCode,
            ["numberOfQuestions"] = req.NumberOfQuestions.ToString() ?? "",
            ["difficultyLevel"] = req.Difficulty.ToString() ?? "Mix",
            ["subject"] = req.Subject ?? "All",
            ["language"] = req.Language,
            ["testId"] = "0",
            ["examId"] = req.ExamId.ToString(),
            ["testTitle"] = req.Title,
        };

        var webhookUrl = QueryHelpers.AddQueryString(_webhookUrl, query);
        _log.LogInformation("Calling n8n webhook {Url}", webhookUrl);

        using var resp = await client.GetAsync(webhookUrl, ct);
        resp.EnsureSuccessStatusCode();

        var raw = await resp.Content.ReadAsStringAsync(ct);

        return System.Text.Json.JsonSerializer.Deserialize<N8nResponseDto>(raw,
                      new JsonSerializerOptions { PropertyNameCaseInsensitive = true })
                   ?? throw new ApplicationException("Empty n8n response");
    }

    private async Task<N8nResponseDto> GetAIGeneratedQuestions(TestDetailsDto req, int subjectId, CancellationToken ct)
    {
        var client = _http.CreateClient();
        client.DefaultRequestHeaders.Accept.ParseAdd("application/json"); // hint

        var query = new Dictionary<string, string?>
        {
            ["examName"] = req.ExamName,
            ["examCode"] = req.ExamCode,
            ["numberOfQuestions"] = req.TotalQuestions.ToString() ?? "",
            ["difficultyLevel"] = "Mix",
            ["subject"] = req.Subject ?? "All",
            ["language"] = req.Language,
            ["testId"] = req.Id.ToString(),
            ["examId"] = req.ExamId.ToString(),
            ["subjectId"] = subjectId.ToString(),
            ["testTitle"] = req.Title,
        };

        var webhookUrl = QueryHelpers.AddQueryString(_webhookUrl, query);
        _log.LogInformation("Calling n8n webhook {Url}", webhookUrl);

        using var resp = await client.GetAsync(webhookUrl, ct);
        resp.EnsureSuccessStatusCode();

        var raw = await resp.Content.ReadAsStringAsync(ct);

        return System.Text.Json.JsonSerializer.Deserialize<N8nResponseDto>(raw,
                      new JsonSerializerOptions { PropertyNameCaseInsensitive = true })
                   ?? throw new ApplicationException("Empty n8n response");
    }

    // Update the mapping of Difficulty property in the  method to convert DifficultyLevel to string.
    public async Task<TestDetailsDto?> GetTestAsync(int id, CancellationToken ct = default)
    {
        return await _db.Tests
                        .AsNoTracking()
                        .Include(t => t.Exam).ThenInclude(e => e.Subjects)
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
                            SubjectId = t.Exam.Subjects.FirstOrDefault(s => s.Title == t.Subject)!.Id,
                            Subject = t.Subject,
                            Language = t.Language,
                            ImageUrl = t.Exam.ImageUrl ?? "../assets/images/exams/icons/exam.png",
                            Status = t.Status,
                            MarksScored = t.MarksScored,
                            TotalMarks = t.TotalMarks,
                            ExamName = t.Exam.Name,
                            ExamCode = t.Exam.Code,
                            Questions = t.TestQuestions
                                         .OrderBy(tq => tq.Order)
                                         .Select(tq => new QuestionDto
                                         {
                                             Id = tq.Question.Id,
                                             QuestionText = tq.Question.QuestionText,
                                             QuestionNo = tq.Order,
                                             Options = tq.Question.Options,
                                             Marks = tq.Question.Marks,
                                             CorrectOptionIds = tq.Question.CorrectOptionIds,
                                             Explanation = tq.Question.Explanation,
                                             Difficulty = tq.Question.Difficulty.ToString() // Convert DifficultyLevel to string  
                                         })
                                         .ToList()
                        })
                        .FirstOrDefaultAsync(ct);
    }

    public async Task<TestDetailsDto?> GetTestInfoAsync(int id, CancellationToken ct = default)
    {
        return await _db.Tests
                        .AsNoTracking()
                        .Include(t => t.Exam)
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
                            ImageUrl = t.Exam.ImageUrl ?? "../assets/images/exams/icons/exam.png",
                            Status = t.Status,
                            MarksScored = t.MarksScored,
                            TotalMarks = t.TotalMarks,
                            ExamName = t.Exam.Name,
                            TotalQuestions = (int)t.TotalQuestions,
                            ExamCode = t.Exam.Code
                        }).FirstOrDefaultAsync(ct);
    }

    public async Task<TestResultDto?> GetTestResultAsync(int id, CancellationToken ct = default)
    {
        var test = await _db.Tests
            .AsNoTracking()
            .Include(t => t.Exam)
            .Include(t => t.TestQuestions)
                .ThenInclude(tq => tq.Question)
            .FirstOrDefaultAsync(t => t.Id == id, ct);

        if (test == null)
            return null;

        var resultDto = _mapper.Map<TestResultDto>(test);
        // resultDto.DurationCompltedIn = test.DurationCompletedIn;

        return resultDto;
    }

    public async Task<TestSubmissionResultDto> SubmitAnswersAsync(int testId, SubmitTestAnswersRequest req, CancellationToken ct = default)
    {
        if (req.Answers.Count == 0)
            throw new ArgumentException("No answers supplied.", nameof(req));

        for (var attempt = 1; attempt <= MaxRetries; attempt++)
        {
            await using var tx = await _db.Database.BeginTransactionAsync(ct);
            try
            {
                var test = await _db.Tests
                    .Include(t => t.TestQuestions)
                        .ThenInclude(tq => tq.Question)
                    .FirstOrDefaultAsync(t => t.Id == testId, ct)
                    ?? throw new KeyNotFoundException($"Test {testId} not found.");

                var answers = req.Answers.ToDictionary(a => a.QuestionId, a => a.SelectedIds);
                int attempted = 0, correct = 0, total = test.TestQuestions.Count;

                foreach (var tq in test.TestQuestions)
                {
                    var q = tq.Question;
                    if (!answers.TryGetValue(q.Id, out var selected)) continue;

                    attempted++;

                    q.SelectedOptionIds = string.Join(",", selected);
                    q.IsCorrect = IsAnswerCorrect(q, selected);
                    q.AnsweredAt = DateTime.UtcNow;
                    if (q.IsCorrect == true) correct++;
                }

                // Persist overall test marks
                test.TotalMarks = total;
                test.MarksScored = correct;
                test.DurationCompltedIn = req.DurationCompletedIn;
                test.SubmissionTime = req.SubmissionTime;

                var percentage = total == 0 ? 0 : Math.Round(correct * 100.0 / total, 2);
                test.Status = percentage > 70 ? TestStatus.Passed : TestStatus.Failed;

                await _db.SaveChangesAsync(ct);
                await tx.CommitAsync(ct);

                return new TestSubmissionResultDto(
                    testId,
                    total,
                    attempted,
                    correct,
                    attempted - correct,
                    total == 0 ? 0 : Math.Round(correct * 100.0 / total, 2));
            }
            catch (DbUpdateConcurrencyException ex) when (attempt < MaxRetries)
            {
                _log.LogWarning(ex,
                    "SubmitAnswers concurrency collision – retry {Attempt}/{Max}", attempt, MaxRetries);
            }
        }

        throw new InvalidOperationException("Could not submit answers due to concurrent edits.");
    }


    private static bool IsAnswerCorrect(Question q, string[] selected)
    {
        var correct = q.CorrectOptionIds
                       .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        return q.Type == QuestionType.Single
               ? selected.Length == 1 && correct.Length == 1 && selected[0] == correct[0]
               : selected.OrderBy(x => x).SequenceEqual(correct.OrderBy(x => x), StringComparer.OrdinalIgnoreCase);
    }
}
