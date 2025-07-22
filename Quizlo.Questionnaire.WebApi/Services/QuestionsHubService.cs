using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Quizlo.Questionnaire.WebApi.DTO;
using Quizlo.Questionnaire.WebApi.Services;
using Quizlo.Questionnaire.WebApi.Data;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.Helpers;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using System.Text.Json;

public class QuestionsHubService : IQuestionsHubService
{
    private readonly QuizDbContext _context;
    private readonly IMapper _mapper;
    private readonly IHttpClientFactory _http;
    private readonly ILogger<TestService> _log;
    private readonly string _webhookUrl;
    private const int MaxRetries = 3;


    public QuestionsHubService(QuizDbContext db,
                       IHttpClientFactory http,
                       IConfiguration cfg,
                       IMapper mapper,
                       ILogger<TestService> log)
    {
        _context = db;
        _http = http;
        _mapper = mapper;
        _log = log;
        _webhookUrl = cfg["N8n:WebhookUrl"]!; // -> appsettings.json
    }

    public async Task<IReadOnlyList<QuestionDto>> GetQuestionsFromHubAsync(int examId, int subjectId, int questionsCount = 0)
    {
        // Filter QuestionsHub for this Exam + Subject and collapse to DISTINCT Questions
        // Using GroupBy to ensure distinct by QuestionId across providers (safer than Distinct on entity)
        var distinctQuestionsQuery = _context.QuestionsHubs
            .AsNoTracking()
            .Where(qh => qh.ExamId == examId && qh.SubjectId == subjectId)
            .GroupBy(qh => qh.QuestionId)
            .Select(g => g.Select(x => x.Question).First());

        // Materialize once so we can randomize & stratify in memory
        var allQuestions = await distinctQuestionsQuery.ToListAsync();

        if (allQuestions.Count == 0)
            return Array.Empty<QuestionDto>();

        // If questionsCount <= 0, just take *all* (shuffle below)
        var takeCount = questionsCount <= 0 ? allQuestions.Count : Math.Min(questionsCount, allQuestions.Count);

        // Bucket by difficulty
        var byDifficulty = allQuestions
            .GroupBy(q => q.Difficulty)
            .ToDictionary(g => g.Key, g => g.ToList());

        // Build target counts per bucket
        var allocations = AllocateByDifficulty(
            DefaultDifficultyMix,
            byDifficulty,
            takeCount);

        // RNG
        var rng = new Random(); // You can inject a seeded RNG for testability

        // Sample from each bucket
        var picked = new List<Question>(takeCount);
        foreach (var kvp in allocations)
        {
            var diff = kvp.Key;
            var need = kvp.Value;
            if (need <= 0) continue;
            if (!byDifficulty.TryGetValue(diff, out var list) || list.Count == 0) continue;

            // Shuffle & take
            var sampled = list.OrderBy(_ => rng.Next()).Take(need);
            picked.AddRange(sampled);
        }

        // If, due to empty buckets, we have fewer than needed, top up from remaining pool not yet picked
        if (picked.Count < takeCount)
        {
            var pickedIds = picked.Select(q => q.Id).ToHashSet();
            var leftovers = allQuestions.Where(q => !pickedIds.Contains(q.Id))
                .OrderBy(_ => rng.Next())
                .Take(takeCount - picked.Count);
            picked.AddRange(leftovers);
        }

        // Final shuffle across all chosen questions
        picked = picked.OrderBy(_ => rng.Next()).ToList();

        // Map to DTOs + assign QuestionNo
        var results = new List<QuestionDto>(picked.Count);
        for (int i = 0; i < picked.Count; i++)
        {
            var q = picked[i];
            results.Add(new QuestionDto
            {
                Id = q.Id,
                QuestionText = q.QuestionText,
                QuestionNo = i + 1,
                OptionsJson = q.OptionsJson,
                Type = q.Type,
                Difficulty = q.Difficulty.ToString(),
                Explanation = q.Explanation,
                CorrectOptionIds = q.CorrectOptionIds,
                SelectedOptionIds = q.SelectedOptionIds,
                IsCorrect = q.IsCorrect,
                IsMultipleSelect = q.Type == QuestionType.Multiple,
                Marks = q.Marks,
                MinusMarks = q.MinusMarks,
                AnsweredAt = q.AnsweredAt
            });
        }

        return results;
    }

    private static Dictionary<DifficultyLevel, int> AllocateByDifficulty(
        IReadOnlyDictionary<DifficultyLevel, double> weightMap,
        IDictionary<DifficultyLevel, List<Question>> available,
        int totalNeeded)
    {
        // Normalize weights to only those in enum; remainder bucket collects unknown difficulties
        var knownWeightsSum = weightMap.Values.Sum();
        if (knownWeightsSum <= 0)
            knownWeightsSum = 1; // defensive

        // Initial target counts (rounded to nearest integer)
        var targets = new Dictionary<DifficultyLevel, int>();
        var running = 0;
        foreach (var kv in weightMap)
        {
            var count = (int)Math.Round(totalNeeded * (kv.Value / knownWeightsSum), MidpointRounding.AwayFromZero);
            targets[kv.Key] = count;
            running += count;
        }

        // Adjust rounding drift
        if (running != totalNeeded)
        {
            var diff = totalNeeded - running;
            // Apply drift by giving/taking 1 at a time to the largest weight buckets first
            var ordered = weightMap.OrderByDescending(kv => kv.Value).Select(kv => kv.Key).ToList();
            var idx = 0;
            while (diff != 0)
            {
                var key = ordered[idx % ordered.Count];
                targets[key] += diff > 0 ? 1 : -1;
                diff += diff > 0 ? -1 : 1;
                idx++;
            }
        }

        // Cap by availability; track shortfall
        var shortfall = 0;
        foreach (var key in targets.Keys.ToList())
        {
            var have = available.TryGetValue(key, out var list) ? list.Count : 0;
            if (targets[key] > have)
            {
                shortfall += targets[key] - have;
                targets[key] = have;
            }
        }

        // Redistribute shortfall across buckets that still have excess supply (including unmapped difficulties)
        if (shortfall > 0)
        {
            // Build a supply list of extra questions across *all* difficulties
            // Extra = available - already allocated
            var supply = new List<(DifficultyLevel diff, int extra)>();
            foreach (var kv in available)
            {
                var have = kv.Value.Count;
                var allocated = targets.TryGetValue(kv.Key, out var t) ? t : 0;
                var extra = have - allocated;
                if (extra > 0) supply.Add((kv.Key, extra));
            }

            var i = 0;
            while (shortfall > 0 && supply.Count > 0)
            {
                var (diffKey, extra) = supply[i % supply.Count];
                if (!targets.ContainsKey(diffKey))
                    targets[diffKey] = 0;
                targets[diffKey]++;
                shortfall--;
                extra--;
                if (extra <= 0)
                {
                    supply.RemoveAt(i % supply.Count);
                    if (supply.Count == 0) break;
                }
                else
                {
                    supply[i % supply.Count] = (diffKey, extra);
                    i++;
                }
            }
        }

        // Final safety clamp
        var totalFinal = targets.Values.Sum();
        if (totalFinal > totalNeeded)
        {
            // Trim biggest buckets first
            var over = totalFinal - totalNeeded;
            foreach (var key in targets.OrderByDescending(kv => kv.Value).Select(kv => kv.Key).ToList())
            {
                if (over <= 0) break;
                var reduce = Math.Min(over, targets[key]);
                targets[key] -= reduce;
                over -= reduce;
            }
        }

        return targets;
    }

    public async Task<int> IsQuestionCountSufficientAsync(int examId, int subjectId, int expectedCount)
    {
        if (expectedCount <= 0)
            throw new ArgumentException("Expected count must be greater than zero.", nameof(expectedCount));

        // Count distinct QuestionIds in QuestionsHub for given Exam + Subject
        int actualCount = await _context.QuestionsHubs
            .AsNoTracking()
            .Where(qh => qh.ExamId == examId && qh.SubjectId == subjectId)
            .Select(qh => qh.QuestionId)
            .Distinct()
            .CountAsync();

        return actualCount;
    }

    public async Task<IReadOnlyList<QuestionDto>> GetQuestionsFromAiAsync(int examId, int subjectId, int expectedCount = 30, string language = "English", CancellationToken ct = default)
    {

        var exam = await _context.Exams.Include(e => e.Subjects).FirstOrDefaultAsync(e => e.Id == examId);
        if (exam == null)
            throw new KeyNotFoundException($"Exam with Id {examId} not found.");

        foreach (var sub in exam.Subjects)
        {
            var req = new QuestionsHubCreateDto
            {
                ExamId = examId,
                SubjectId = sub.Id,
                ExamName = exam.Name,
                ExamCode = exam.Code,
                Subject = sub.Title,
                Language = language,
            };

            var env = await GetAIGeneratedQuestions(req, ct);
            return env.Questions!;
        }

        throw new KeyNotFoundException($"Subjects with Exam Id {examId} not found.");

    }

    public async Task<IReadOnlyList<QuestionsHubDto>> InsertQuestionsAndHubAsync(int examId, int subjectId, int createdBy,
     IEnumerable<QuestionDto> questions, string? topic = null, CancellationToken cancellationToken = default)
    {
        if (questions is null) throw new ArgumentNullException(nameof(questions));

        // Validate Exam + Subject relationship
        var subject = await _context.Subjects
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.Id == subjectId && s.ExamId == examId, cancellationToken);

        if (subject is null)
            throw new ArgumentException("Invalid examId/subjectId combination. Subject not linked to exam.");

        var incoming = questions.ToList();
        if (incoming.Count == 0)
            throw new ArgumentException("No questions to insert.", nameof(questions));

        using var tx = await _context.Database.BeginTransactionAsync(cancellationToken);
        try
        {
            var utcNow = DateTime.UtcNow;
            var hubs = new List<QuestionsHub>(incoming.Count);

            foreach (var dto in incoming)
            {
                var question = new Question
                {
                    QuestionText = dto.QuestionText,
                    OptionsJson = dto.OptionsJson,
                    Type = dto.Type,
                    Difficulty = ParseDifficulty(dto.Difficulty),
                    Explanation = dto.Explanation,
                    CorrectOptionIds = dto.CorrectOptionIds,
                    SelectedOptionIds = dto.SelectedOptionIds,
                    IsCorrect = dto.IsCorrect,
                    Marks = dto.Marks,
                    MinusMarks = dto.MinusMarks,
                    AnsweredAt = dto.AnsweredAt
                };

                // Enforce Multiple type if DTO says it's multi-select
                if (dto.IsMultipleSelect && question.Type != QuestionType.Multiple)
                    question.Type = QuestionType.Multiple;

                hubs.Add(new QuestionsHub
                {
                    ExamId = examId,
                    SubjectId = subjectId,
                    Question = question, // EF will insert Question then Hub automatically
                    Topic = topic,
                    CreatedAt = utcNow,
                    CreatedBy = createdBy,
                    IsActive = true,
                    Difficulty = dto.Difficulty ?? question.Difficulty.ToString()
                });
            }

            _context.QuestionsHubs.AddRange(hubs);
            await _context.SaveChangesAsync(cancellationToken);

            subject.TotalQuestions = await _context.QuestionsHubs.Where(h => h.ExamId == examId && h.SubjectId == subjectId)
                .Select(h => h.QuestionId).Distinct()
                .CountAsync(cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            await tx.CommitAsync(cancellationToken);
            // Reload just-created Hub rows
            var result = await _context.QuestionsHubs
                .AsNoTracking()
                .Where(h => h.ExamId == examId && h.SubjectId == subjectId)
                .Include(h => h.Exam)
                .Include(h => h.Subject)
                .Include(h => h.Question)
                .ProjectTo<QuestionsHubDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return result;
        }
        catch
        {
            await tx.RollbackAsync(cancellationToken);
            throw;
        }
    }


    // ----------------- Helper -----------------
    private static DifficultyLevel ParseDifficulty(string? s)
    {
        if (string.IsNullOrWhiteSpace(s)) return DifficultyLevel.Medium;
        return Enum.TryParse<DifficultyLevel>(s, true, out var parsed)
            ? parsed
            : DifficultyLevel.Medium;
    }


    private async Task<TestDetailsDto> AddQuestionsHubAsync(TestDetailsDto testDetails, CancellationToken ct = default)
    {
        for (var attempt = 1; attempt <= MaxRetries; attempt++)
        {
            await using var tx = await _context.Database.BeginTransactionAsync(ct);

            var test = await _context.Tests.Include(t => t.TestQuestions).ThenInclude(tq => tq.Question)
                                .FirstOrDefaultAsync(t => t.Id == testDetails.Id, ct)
                                ?? throw new KeyNotFoundException($"Test {testDetails.Id} not found.");

            #region --------- AddQuestions to the database ------------

            var questions = testDetails.Questions.Select(q => new Question
            {
                QuestionText = q.QuestionText,
                Options = q.Options,
                OptionsJson = JsonConvert.SerializeObject(q.Options), // ↔ OptionsJson
                CorrectOptionIds = q.CorrectOptionIds,
                Explanation = q.Explanation,
                Marks = q.Marks,
                Type = q.IsMultipleSelect ? QuestionType.Multiple : QuestionType.Single,
                Difficulty = Enum.Parse<DifficultyLevel>(q.Difficulty, true),
            }).ToList();

            _context.Questions.AddRange(questions);
            await _context.SaveChangesAsync(ct);

            var links = questions.Select((q, i) => new TestQuestion
            {
                TestId = test.Id,
                QuestionId = q.Id,
                Order = testDetails.Questions[i].QuestionNo
            });

            _context.TestQuestions.AddRange(links);
            await _context.SaveChangesAsync(ct);

            #endregion


            test.TotalQuestions = testDetails.TotalQuestions;
            test.TotalMarks = testDetails.TotalMarks;
            test.Duration = testDetails.Duration;

            await _context.SaveChangesAsync(ct);
            await tx.CommitAsync(ct);

            var questionsDto = _mapper.Map<List<QuestionDto>>(questions);
            var testDto = _mapper.Map<TestDetailsDto>(test);
            testDto.Questions = questionsDto;

            return testDto;

        }

        return testDetails;
    }

    private async Task<N8nResponseDto> GetAIGeneratedQuestions(QuestionsHubCreateDto req, CancellationToken ct)
    {
        var client = _http.CreateClient();
        client.DefaultRequestHeaders.Accept.ParseAdd("application/json"); // hint

        var query = new Dictionary<string, string?>
        {
            ["examName"] = req.ExamName,
            ["examCode"] = req.ExamCode,
            ["numberOfQuestions"] = "30",
            ["difficultyLevel"] = "Mix",
            ["subject"] = req.Subject,
            ["language"] = req.Language,
            ["examId"] = req.ExamId.ToString(),
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


    private static readonly IReadOnlyDictionary<DifficultyLevel, double> DefaultDifficultyMix =
    new Dictionary<DifficultyLevel, double>
    {
        { DifficultyLevel.Easy,   0.40 },
        { DifficultyLevel.Medium, 0.40 },
        { DifficultyLevel.Hard,   0.20 },
        // Any other enum values will be treated as spillover.
    };

    public async Task<QuestionsHubDto> CreateAsync(QuestionsHubCreateDto dto)
    {
        var entity = _mapper.Map<QuestionsHub>(dto);

        // Validate foreign keys
        if (!await _context.Exams.AnyAsync(e => e.Id == dto.ExamId))
            throw new Exception("Invalid ExamId.");
        if (!await _context.Subjects.AnyAsync(s => s.Id == dto.SubjectId))
            throw new Exception("Invalid SubjectId.");
        if (!await _context.Questions.AnyAsync(q => q.Id == dto.QuestionId))
            throw new Exception("Invalid QuestionId.");

        _context.QuestionsHubs.Add(entity);
        await _context.SaveChangesAsync();

        return _mapper.Map<QuestionsHubDto>(entity);
    }

    public async Task<IEnumerable<QuestionsHubDto>> GetAllAsync()
    {
        return await _context.QuestionsHubs
            .Include(qh => qh.Exam)
            .Include(qh => qh.Subject)
            .Include(qh => qh.Question)
            .ProjectTo<QuestionsHubDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<IEnumerable<QuestionsHubDto>> GetByExamAndSubjectAsync(int examId, int subjectId)
    {
        return await _context.QuestionsHubs
            .Where(qh => qh.ExamId == examId && qh.SubjectId == subjectId)
            .Include(qh => qh.Exam)
            .Include(qh => qh.Subject)
            .Include(qh => qh.Question)
            .ProjectTo<QuestionsHubDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }
}
