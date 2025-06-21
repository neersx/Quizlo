// Controllers/ExamsController.cs
using Microsoft.AspNetCore.Mvc;
using Quizlo.Questionnaire.WebApi.Data.Entities;
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
        public async Task<ActionResult<IEnumerable<Exam>>> GetExams(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string search = null)
        {
            var exams = await _examService.GetExamsAsync(pageNumber, pageSize, search);
            return Ok(exams);
        }

        // GET: api/exams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Exam>> GetExam(int id)
        {
            var exam = await _examService.GetExamAsync(id);
            if (exam == null) return NotFound();
            return Ok(exam);
        }

        // POST: api/exams
        [HttpPost]
        public async Task<ActionResult<Exam>> CreateExam([FromBody] Exam exam)
        {
            var created = await _examService.CreateExamAsync(exam);
            return CreatedAtAction(nameof(GetExam), new { id = created.Id }, created);
        }

        // PUT: api/exams/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Exam>> UpdateExam(int id, [FromBody] Exam exam)
        {
            if (id != exam.Id) return BadRequest();
            var updated = await _examService.UpdateExamAsync(exam);
            return Ok(updated);
        }

        // DELETE: api/exams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExam(int id)
        {
            var success = await _examService.DeleteExamAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
