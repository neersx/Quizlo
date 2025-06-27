using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quizlo.Questionnaire.WebApi.DTO;
using System.Security.Claims;

namespace Quizlo.Questionnaire.WebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class TestsController : ControllerBase
    {
        private readonly ITestService _svc;

        public TestsController(ITestService svc) => _svc = svc;

        /// <summary>Returns every test created by the currently-logged-in user.</summary>
        [HttpGet]                                // GET api/tests
        public async Task<ActionResult<IEnumerable<ApiResponse<TestDetailsDto>>>> GetMyTests(
            CancellationToken ct)
        {
            // Identity uses the NameIdentifier claim to store User.Id
            if (!int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId))
                return Unauthorized("User id not found in token.");

            var tests = await _svc.GetUserTestsAsync(userId, ct);
            return Ok(ApiResponse<IEnumerable<TestDetailsDto>>.Success(tests));
        }

        /// POST api/tests
        [HttpPost]
        [ProducesResponseType(typeof(TestDetailsDto), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create([FromBody] CreateTestRequest request,
                                                CancellationToken ct)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var dto = await _svc.CreateTestAsync(request, userId, ct);

            return CreatedAtRoute(nameof(GetTest), new { id = dto.Id }, dto);
        }

        /// GET api/tests/{id}
        [HttpGet("{id:int}", Name = nameof(GetTest))]
        [ProducesResponseType(typeof(TestDetailsDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTest(int id, CancellationToken ct)
            => await _svc.GetTestAsync(id, ct) is { } dto
               ? Ok(dto)
               : NotFound();

        /// <summary>Submit all answers for the specified test.</summary>
        [HttpPost("{testId:int}/submit")]
        public async Task<ActionResult<ApiResponse<TestSubmissionResultDto>>> Submit(
            int testId,
            [FromBody] SubmitTestAnswersRequest request,
            CancellationToken ct)
        {
            if (request is null || request.Answers.Count == 0)
                return BadRequest("Answers collection cannot be empty.");

            var result = await _svc.SubmitAnswersAsync(testId, request, ct);
            return Ok(ApiResponse<TestSubmissionResultDto>.Success(result));
        }
    }

}
