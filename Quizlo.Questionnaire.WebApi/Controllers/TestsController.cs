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
        public async Task<IActionResult> CreateTest([FromBody] CreateTestRequest request,
                                                CancellationToken ct)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var dto = await _svc.CreateTestAsync(request, userId, ct);

            var apiResponse = ApiResponse<TestDetailsDto>.Success(dto, "Test created successfully", StatusCodes.Status201Created);
            return CreatedAtRoute(nameof(GetTest), new { id = dto.Id }, apiResponse);
        }

        [HttpPost("create-initial-test")]
        [ProducesResponseType(typeof(ApiResponse<TestDetailsDto>), StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateInitialTest([FromBody] CreateTestRequest request, CancellationToken ct)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var dto = await _svc.CreateInitialTestAsync(request, userId, ct);

            var apiResponse = ApiResponse<TestDetailsDto>.Success(
                dto,
                "Initial test created successfully",
                StatusCodes.Status201Created
            );

            // CreatedAtRoute will still return 201
            return CreatedAtRoute(
                nameof(GetTest),               // assuming you have a GetTest(id) action
                new { id = dto.Id },
                apiResponse
            );
        }

        [HttpGet("questions")]
        [ProducesResponseType(typeof(ApiResponse<TestDetailsDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTestQuestions([FromBody] CreateTestRequest request, CancellationToken ct)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var dto = await _svc.CreateTestAsync(request, userId, ct);

            var apiResponse = ApiResponse<TestDetailsDto>.Success(
                dto,
                "Test questions retrieved successfully",
                StatusCodes.Status200OK
            );

            return Ok(apiResponse);
        }

        [HttpGet("{testId:int}/questions")]
        [ProducesResponseType(typeof(ApiResponse<TestDetailsDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTestQuestionsByTestId(int testId, CancellationToken ct)
        {
            var dto = await _svc.GetQuestionsByTestIdAsync(testId, ct);
            var apiResponse = ApiResponse<TestDetailsDto>.Success(dto,"Test questions retrieved successfully", StatusCodes.Status200OK);

            return Ok(apiResponse);
        }

        /// GET api/tests/{id}
        [HttpGet("{id:int}", Name = nameof(GetTest))]
        [ProducesResponseType(typeof(ApiResponse<TestDetailsDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<TestDetailsDto>), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTest(int id, CancellationToken ct)
        {
            var dto = await _svc.GetTestInfoAsync(id, ct);
            if (dto is not null)
            {
                var success = ApiResponse<TestDetailsDto>.Success(dto);
                return Ok(success);
            }
            else
            {
                var failure = ApiResponse<TestDetailsDto>.Failure(
                    $"Test with id {id} not found",
                    StatusCodes.Status404NotFound
                );
                return NotFound(failure);
            }
        }

        [HttpGet("result/{id:int}", Name = nameof(GetTestResult))]
        [ProducesResponseType(typeof(ApiResponse<TestResultDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<TestResultDto>), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTestResult(int id, CancellationToken ct)
        {
            var dto = await _svc.GetTestResultAsync(id, ct);
            if (dto is not null)
            {
                var success = ApiResponse<TestResultDto>.Success(dto);
                return Ok(success);
            }
            else
            {
                var failure = ApiResponse<TestResultDto>.Failure(
                    $"Result for test id {id} not found",
                    StatusCodes.Status404NotFound
                );
                return NotFound(failure);
            }
        }


        [HttpPost("{testId:int}/submit")]
        public async Task<ActionResult<ApiResponse<TestSubmissionResultDto>>> Submit(int testId,[FromBody] SubmitTestAnswersRequest request,
            CancellationToken ct)
        {
            if (request is null || request.Answers.Count == 0)
                return BadRequest("Answers collection cannot be empty.");

            var result = await _svc.SubmitAnswersAsync(testId, request, ct);
            return Ok(ApiResponse<TestSubmissionResultDto>.Success(result));
        }
    }

}
