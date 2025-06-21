using Microsoft.AspNetCore.Identity;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.Services;

namespace Quizlo.Questionnaire.WebApi.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;

        public UserService(UserManager<User> userManager)
            => _userManager = userManager;

        public Task<User> GetUserByIdAsync(string userId)
            => _userManager.FindByIdAsync(userId);

        public async Task<User> CreateUserAsync(string email, string password, string firstName, string lastName, string phoneNumber)
        {
            var user = new User { UserName = email, Email = email, FirstName = firstName, LastName = lastName, PhoneNumber = phoneNumber,
                EmailConfirmed = false, PhoneNumberConfirmed = false,
                CreatedAt = DateTime.UtcNow, GoogleId ="NA" };
            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded) return user;

            throw new ApplicationException(
                string.Join("; ", result.Errors.Select(e => e.Description))
            );
        }

        public Task<bool> CheckPasswordAsync(User user, string password)
            => _userManager.CheckPasswordAsync(user, password);
    }
}
