using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.DTO;

namespace Quizlo.Questionnaire.WebApi.Services
{
    public interface IUserService
    {
        Task<User> GetUserByIdAsync(string userId);
        Task<AuthResponseDto> LoginAsync(string email, string password);
        Task<UserCurrentUsageDto> GetUserCurrentUsageAsync(int userId);
        Task<UserWithSubscriptionDto> CreateUserAsync(string email, string password, string firstName, string lastName, string phoneNumber);
        Task<bool> CheckPasswordAsync(User user, string password);
        Task<EligibilityResultDto> CheckUserTestEligibility(int userId);
        Task<UserWithSubscriptionDto> GetUserWithSubscriptionAsync(int userId);
    }
}
