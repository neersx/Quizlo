using Microsoft.AspNetCore.Identity;
using Quizlo.Questionnaire.WebApi.Services;

namespace Quizlo.Questionnaire.WebApi.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<IdentityUser> _userManager;

        public UserService(UserManager<IdentityUser> userManager)
            => _userManager = userManager;

        public Task<IdentityUser> GetUserByIdAsync(string userId)
            => _userManager.FindByIdAsync(userId);

        public async Task<IdentityUser> CreateUserAsync(string email, string password)
        {
            var user = new IdentityUser { UserName = email, Email = email };
            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded) return user;
            throw new ApplicationException(
                string.Join("; ", result.Errors.Select(e => e.Description))
            );
        }

        public Task<bool> CheckPasswordAsync(IdentityUser user, string password)
            => _userManager.CheckPasswordAsync(user, password);
    }
}
