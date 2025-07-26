using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Quizlo.Questionnaire.WebApi.DTO;
using Quizlo.Questionnaire.WebApi.Services;

[Route("api/questions-hub")]
[ApiController]
public class QuestionsHubController : ControllerBase
{
    private readonly IQuestionsHubService _service;

    public QuestionsHubController(IQuestionsHubService service)
    {
        _service = service;
    }

    [HttpGet("{examId:int}/{subjectId:int}/check-count")]
    public async Task<IActionResult> CheckQuestionCount(int examId, int subjectId, [FromQuery] int expectedCount)
    {
        int count = await _service.IsQuestionCountSufficientAsync(examId, subjectId, expectedCount);
        return Ok(new { IsSufficient = count >= expectedCount, Count = count });
    }

    [HttpGet("draw-questions/{subjectId:int}")]
    public async Task<IActionResult> DrawQuestions(int subjectId, [FromQuery] int count = 0)
    {
        var questions = await _service.GetQuestionsFromHubAsync(subjectId, count);
        return Ok(new ApiResponse<IReadOnlyList<QuestionDto>> { IsSuccess = true, Message = "fetched questions from hub", Data = questions });
    }

    [HttpPost("{subjectId:int}/insert-questions")]
    public async Task<IActionResult> InsertQuestionsAndHub( int subjectId, [FromQuery] string? topic,  [FromBody] List<QuestionDto> questions, CancellationToken cancellationToken = default)
    {
        int createdBy = 1;
        var result = await _service.InsertQuestionsAndHubAsync(subjectId, createdBy, questions, topic, cancellationToken: cancellationToken);

        return Ok(result);
    }


    [HttpPost]
    public async Task<IActionResult> Create([FromBody] QuestionsHubCreateDto dto)
    {
        var result = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetAll), new { id = result.Id }, result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _service.GetAllAsync();
        return Ok(result);
    }

    [HttpGet("{examId}/{subjectId}")]
    public async Task<IActionResult> GetByExamAndSubject(int examId, int subjectId)
    {
        var result = await _service.GetByExamAndSubjectAsync(examId, subjectId);
        return Ok(result);
    }
}
