using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Quizlo.Questionnaire.WebApi.DTO;
using Quizlo.Questionnaire.WebApi.Data.Entities;

namespace Quizlo.Questionnaire.WebApi.Controllers
{

    [ApiController]
    [Route("api/user-profile")]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        public ProfileController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<UserProfileDto>> GetMyProfile()
        {
            // 1) get the User entity from the current ClaimsPrincipal
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return Unauthorized();

            // 2) load roles (if you’re using ASP.NET Identity roles)
            var roles = await _userManager.GetRolesAsync(user);

            // 3) map into the DTO
            var dto = new UserProfileDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                GoogleId = user.GoogleId,
                CreatedAt = user.CreatedAt,
                DateOfBirth = user.DateOfBirth,
                Profession = user.Profession,
                City = user.City,
                State = user.State,
                PostalCode = user.PostalCode,
                Address = user.Address,
                Country = user.Country,
                Hobbies = user.Hobbies,
                Gender = user.Gender,
                Linkedin = user.Linkedin,
                Twitter = user.Twitter,
                Instagram = user.Instagram,
                Facebook = user.Facebook,
                ImageUrl = user.ImageUrl,
                Designation = user.Designation,
                Company = user.Company,
                About = user.About,
                Skills = user.Skills,
                Headline = user.Headline,
                Roles = roles
            };
            return Ok(ApiResponse<UserProfileDto>.Success(dto));
        }

        // PUT /api/profile
        [HttpPut]
        public async Task<IActionResult> UpdateMyProfile([FromBody] UpdateUserProfileDto model)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            // map allowed fields
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.DateOfBirth = model.DateOfBirth;
            user.Profession = model.Profession;
            user.City = model.City;
            user.State = model.State;
            user.PostalCode = model.PostalCode;
            user.Address = model.Address;
            user.Country = model.Country;
            user.Hobbies = model.Hobbies;
            user.Gender = model.Gender;
            user.Linkedin = model.Linkedin;
            user.Twitter = model.Twitter;
            user.Instagram = model.Instagram;
            user.Facebook = model.Facebook;
            user.ImageUrl = model.ImageUrl;
            user.Designation = model.Designation;
            user.Company = model.Company;
            user.About = model.About;
            user.Skills = model.Skills;
            user.Headline = model.Headline;

            // if email changed, use the Identity API so confirmations etc. work
            if (!string.IsNullOrWhiteSpace(model.Email) && model.Email != user.Email)
            {
                var setEmail = await _userManager.SetEmailAsync(user, model.Email);
                if (!setEmail.Succeeded)
                    return BadRequest(setEmail.Errors);
            }

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(ApiResponse<UpdateUserProfileDto>.Success(model));
        }

        // DELETE /api/profile
        [HttpDelete]
        public async Task<IActionResult> DeleteMyAccount()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return NoContent();
        }
    }

}