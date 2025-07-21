using Microsoft.AspNetCore.Mvc;
using Quizlo.Questionnaire.WebApi.DTO;
using Quizlo.Questionnaire.WebApi.Services;

[Route("api/[controller]")]
[ApiController]
public class QuestionsHubController : ControllerBase
{
    private readonly IQuestionsHubService _service;

    public QuestionsHubController(IQuestionsHubService service)
    {
        _service = service;
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
