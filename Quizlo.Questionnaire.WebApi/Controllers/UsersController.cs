using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.DTO;
using Quizlo.Questionnaire.WebApi.Services;

namespace Quizlo.Questionnaire.WebApi.Controllers
{
    public class RegisterDto { public string Email { get; set; } public string Password { get; set; } public string FullName { get; set; } public string PhoneNumber { get; set; } }
    public class LoginDto { public string Email { get; set; } public string Password { get; set; } }


    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly JwtTokenService _jwtTokenService;
        private readonly ITestService _testService;

        public UsersController(
            UserManager<User> userManager, JwtTokenService jwtTokenService,
            IUserService userService,
            ITestService testService,
            SignInManager<User> signInManager)
        {
            _userService = userService;
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
            _signInManager = signInManager;
            _testService = testService;
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<User>>> GetUser(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(ApiResponse<User>.Success(user));
        }

        [HttpGet("active-tests")]
        public async Task<ActionResult<ApiResponse<User>>> GetUserActiveTests(CancellationToken ct)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await _testService.GetUserActiveTestsAsync(userId, ct);

            var apiResponse = ApiResponse<IReadOnlyList<TestDetailsDto>>.Success(result, "Test questions retrieved successfully", StatusCodes.Status200OK);
            return Ok(apiResponse);
        }

        // POST: api/users/register
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register([FromBody] RegisterDto dto)
        {
            var user = await _userService.CreateUserAsync(dto.Email, dto.Password, dto.FullName.Split(' ')[0], dto.FullName.Split(' ')[1] ?? "", dto.PhoneNumber);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // POST: api/users/login
        [HttpPost("login")]
        public async Task<ActionResult<ApiResponse<AuthResponseDto>>> Login([FromBody] LoginDto dto)
        {
            try
            {
                var response = await _userService.LoginAsync(dto.Email, dto.Password);
                return Ok(ApiResponse<AuthResponseDto>.Success(response));
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        // POST: api/users/logout
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return NoContent();
        }
    }
}

