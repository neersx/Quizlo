using Microsoft.AspNetCore.Identity;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.DTO;

namespace Quizlo.Questionnaire.WebApi.Services
{
    public interface IUserService
    {
        Task<User> GetUserByIdAsync(string userId);
        Task<AuthResponseDto> LoginAsync(string email, string password);
        Task<User> CreateUserAsync(string email, string password, string firstName, string lastName, string phoneNumber);
        Task<bool> CheckPasswordAsync(User user, string password);
    }
}
