using Microsoft.AspNetCore.Identity;

namespace Quizlo.Questionnaire.WebApi.Services
{
    public interface IUserService
    {
        Task<IdentityUser> GetUserByIdAsync(string userId);
        Task<IdentityUser> CreateUserAsync(string email, string password);
        Task<bool> CheckPasswordAsync(IdentityUser user, string password);
    }
}
