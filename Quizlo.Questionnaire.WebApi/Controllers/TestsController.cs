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
    }

}
