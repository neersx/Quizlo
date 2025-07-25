// Controllers/ExamsController.cs
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.DTO;
using Quizlo.Questionnaire.WebApi.Services;

namespace Quizlo.Questionnaire.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExamsController : ControllerBase
    {
        private readonly IExamService _examService;

        public ExamsController(IExamService examService)
            => _examService = examService;

        // GET: api/exams?pageNumber=1&pageSize=10&search=foo
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<Exam>>>> GetExams(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string search = null)
        {
            var exams = await _examService.GetExamsAsync(pageNumber, pageSize, search);
            var result = ApiResponse<IEnumerable<Exam>>.Success(exams);
            return Ok(result);
        }

        // GET: api/exams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<Exam>>> GetById(int id)
        {
            var exam = await _examService.GetExamAsync(id);
            if (exam == null) return NotFound();
            return Ok(ApiResponse<Exam>.Success(exam)); //return Ok(exam);
        }

        [HttpGet("{noOfQuestions}/no-questions")]
        public async Task<ActionResult<ApiResponse<Exam>>> GetExamWithNoQuestions(int noOfQuestions = 100, CancellationToken cancellationToken = default)
        {
            var exams = await _examService.GetExamsWithSubjectsMissingQuestionsAsync(noOfQuestions, cancellationToken);
            if (exams == null) return NotFound();
            return Ok(ApiResponse<List<ExamWithEmptySubjectsDto>>.Success(exams)); //return Ok(exam);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] CreateExamDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var result = await _examService.CreateExamAsync(dto, userId);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateExamDto dto)
        {
            if (id != dto.Id)
                return BadRequest("Mismatched exam id");

            var result = await _examService.UpdateExamAsync(dto);
            return Ok(result);
        }

        // DELETE: api/exams/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteExam(int id)
        {
            var success = await _examService.DeleteExamAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
