using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.Services;

namespace Quizlo.Questionnaire.WebApi.Controllers
{
    public class RegisterDto { public string Email { get; set; } public string Password { get; set; } public string FirstName { get; set; } public string LastName { get; set; } public string PhoneNumber { get; set; } }
    public class LoginDto { public string Email { get; set; } public string Password { get; set; } }

    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly SignInManager<User> _signInManager;

        public UsersController(
            IUserService userService,
            SignInManager<User> signInManager)
        {
            _userService = userService;
            _signInManager = signInManager;
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        // POST: api/users/register
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register([FromBody] RegisterDto dto)
        {
            var user = await _userService.CreateUserAsync(dto.Email, dto.Password, dto.FirstName, dto.LastName, dto.PhoneNumber);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // POST: api/users/login
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDto dto)
        {
            var result = await _signInManager.PasswordSignInAsync(
                dto.Email, dto.Password, isPersistent: false, lockoutOnFailure: false);

            if (!result.Succeeded) return Unauthorized();
            return Ok();
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

