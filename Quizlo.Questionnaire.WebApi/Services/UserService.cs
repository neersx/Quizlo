using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Quizlo.Questionnaire.WebApi.Data;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.DTO;

namespace Quizlo.Questionnaire.WebApi.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly JwtTokenService _jwtTokenService;
        private readonly QuizDbContext _context;

        public UserService(UserManager<User> userManager, QuizDbContext context,
         SignInManager<User> signInManager, JwtTokenService jwtTokenService
        )
        {
            _userManager = userManager;
            _context = context;
            _jwtTokenService = jwtTokenService;
            _signInManager = signInManager;
        }

        public Task<User> GetUserByIdAsync(string userId) => _userManager.FindByIdAsync(userId);

        public async Task<AuthResponseDto> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) throw new UnauthorizedAccessException("Invalid credentials");

            var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);
            if (!result.Succeeded) throw new UnauthorizedAccessException("Invalid credentials");

            var token = await _jwtTokenService.GenerateJwtToken(user);

            // Load user subscription with plan details
            var subscription = await _context.UserSubscriptions
                .Include(us => us.SubscriptionPlan)
                .Where(us => us.UserId == user.Id && DateTime.UtcNow <= us.ValidTill)
                .Select(us => new UserSubscriptionDto
                {
                    PlanName = us.SubscriptionPlan.Name,
                    MaxExams = us.SubscriptionPlan.MaxExamsAllowed,
                    MaxTestsPerExam = us.SubscriptionPlan.MaxTestsPerExam,
                    MaxLanguages = us.SubscriptionPlan.MaxLanguagesPerTest,
                    MaxActiveTests = us.SubscriptionPlan.MaxActiveTests,
                    CanRetryTest = us.SubscriptionPlan.AllowRetryTestAttempt,
                    MaxTestAttempts = us.SubscriptionPlan.MaxTestAttempts,
                    CanScheduleTests = us.SubscriptionPlan.AllowTestScheduling,
                    ShowAnalytics = us.SubscriptionPlan.DisplayTestAnalytics,
                    CanSelectDifficulty = us.SubscriptionPlan.AllowDifficultySelection,
                    DisplayTestTimeline = us.SubscriptionPlan.DisplayTestTimeline,
                })
                .FirstOrDefaultAsync();


            return new AuthResponseDto
            {
                Token = token,
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Subscription = subscription
            };
        }

        public async Task<UserWithSubscriptionDto> GetUserWithSubscriptionAsync(User user)
        {
            var subscription = await _context.UserSubscriptions
                .Include(us => us.SubscriptionPlan)
                .Where(us => us.UserId == user.Id)
                .OrderByDescending(us => us.SubscribedOn)
                .FirstOrDefaultAsync();

            return new UserWithSubscriptionDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Subscription = subscription == null ? null : new SubscriptionDto
                {
                    PlanName = subscription.SubscriptionPlan.Name,
                    SubscribedOn = subscription.SubscribedOn,
                    ValidTill = subscription.ValidTill
                }
            };
        }


        public async Task<UserWithSubscriptionDto> CreateUserAsync(string email, string password, string firstName, string lastName, string phoneNumber)
        {
            var user = new User
            {
                UserName = email,
                Email = email,
                FirstName = firstName,
                LastName = lastName,
                PhoneNumber = phoneNumber,
                EmailConfirmed = false,
                PhoneNumberConfirmed = false,
                CreatedAt = DateTime.UtcNow,
                GoogleId = "NA"
            };

            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                throw new ApplicationException(string.Join("; ", result.Errors.Select(e => e.Description)));
            }

            // ✅ Create default subscription after user is created
            var defaultPlan = await _context.SubscriptionPlans.FirstOrDefaultAsync(p => p.Name == "Foundation"); // or use `Level == SubscriptionLevel.Foundation`

            if (defaultPlan != null)
            {
                var userSubscription = new UserSubscription
                {
                    UserId = user.Id,
                    SubscriptionPlanId = defaultPlan.Id,
                    SubscribedOn = DateTime.UtcNow,
                    PaymentTransactionId = "-1",
                    ValidTill = DateTime.UtcNow.AddDays(defaultPlan.DurationInDays | 30),
                };

                _context.UserSubscriptions.Add(userSubscription);
                await _context.SaveChangesAsync();
            }

            return await GetUserWithSubscriptionAsync(user);
        }


        public Task<bool> CheckPasswordAsync(User user, string password) => _userManager.CheckPasswordAsync(user, password);
    }
}
