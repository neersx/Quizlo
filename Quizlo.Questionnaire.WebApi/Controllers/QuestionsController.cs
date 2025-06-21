// Controllers/QuestionsController.cs
using Microsoft.AspNetCore.Mvc;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.Services;

namespace Quizlo.Questionnaire.WebApi.Controllers
{
    [ApiController]
    [Route("api")]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionService _questionService;

        public QuestionsController(IQuestionService questionService)
            => _questionService = questionService;

        // GET: api/exams/5/questions
        [HttpGet("exams/{examId}/questions")]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestionsByExam(int examId)
        {
            var questions = await _questionService.GetQuestionsByExamAsync(examId);
            return Ok(questions);
        }

        // GET: api/questions/10
        [HttpGet("questions/{id}")]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
            var question = await _questionService.GetQuestionAsync(id);
            if (question == null) return NotFound();
            return Ok(question);
        }

        // POST: api/questions
        [HttpPost("questions")]
        public async Task<ActionResult<Question>> CreateQuestion([FromBody] Question question)
        {
            var created = await _questionService.CreateQuestionAsync(question);
            return CreatedAtAction(nameof(GetQuestion), new { id = created.Id }, created);
        }

        // PUT: api/questions/10
        [HttpPut("questions/{id}")]
        public async Task<ActionResult<Question>> UpdateQuestion(int id, [FromBody] Question question)
        {
            if (id != question.Id) return BadRequest();
            var updated = await _questionService.UpdateQuestionAsync(question);
            return Ok(updated);
        }

        // DELETE: api/questions/10
        [HttpDelete("questions/{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var success = await _questionService.DeleteQuestionAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
