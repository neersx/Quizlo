using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Quizlo.Questionnaire.WebApi.Data;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.DTO;
using Quizlo.Questionnaire.WebApi.Helpers.Constants;

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
            var currentUsage = await GetUserCurrentUsageAsync(user.Id);

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
                SubscriptionPlan = subscription,
                CurrentUsage = currentUsage
            };
        }

        private async Task<UserSubscriptionDto> GetUserSubscriptionAsync(int userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) throw new UnauthorizedAccessException("Invalid user id");

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

            return subscription;
        }

        public async Task<EligibilityResultDto> CheckUserTestEligibility(int userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) throw new UnauthorizedAccessException("Invalid user id");

            // Load user subscription with plan details
            var userSubscription = await GetUserSubscriptionAsync(user.Id);

            var currentUsage = await GetUserCurrentUsageAsync(user.Id);

            var eligibility = ValidateTestCreationEligibility(userSubscription, currentUsage);
            return eligibility;
        }

        public async Task<UserWithSubscriptionDto> GetUserWithSubscriptionAsync(int userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) throw new UnauthorizedAccessException("Invalid user id");

            var subscription = await _context.UserSubscriptions
                .Include(us => us.SubscriptionPlan)
                .Where(us => us.UserId == user.Id)
                .OrderByDescending(us => us.SubscribedOn)
                .FirstOrDefaultAsync();

            var currentUsage = await GetUserCurrentUsageAsync(user.Id);

            return new UserWithSubscriptionDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Subscription = (subscription == null || subscription.SubscriptionPlan == null) ? null : new SubscriptionDto
                {
                    PlanName = subscription.SubscriptionPlan.Name,
                    SubscribedOn = subscription.SubscribedOn,
                    ValidTill = subscription.ValidTill
                },
                CurrentUsage = currentUsage
            };
        }

        public async Task<UserCurrentUsageDto> GetUserCurrentUsageAsync(int userId)
        {
            var userTests = await _context.Tests.Where(t => t.CreatedByUserId == userId).ToListAsync();

            var selectedLanguagesCount = userTests.Select(t => t.Language).Distinct().Count();
            var scheduledTestsCount = userTests.Count(t => t.Status == TestStatus.Scheduled);
            var activeTests = userTests.Count(t => t.Status == TestStatus.Started || t.Status == TestStatus.NotStarted);
            var retryAttempted = userTests.Sum(t => t.AttemptCount > 1 ? t.AttemptCount - 1 : 0);
            var testsCreatedPerExam = userTests
                .GroupBy(t => t.ExamId)
                .Select(g => g.Count())
                .DefaultIfEmpty(0)
                .Max();
            var noOfExamsWithTests = userTests
                .Select(t => t.ExamId)
                .Distinct()
                .Count();

            return new UserCurrentUsageDto
            {
                ActiveTests = activeTests,
                ActiveExamIds = string.Join(",", userTests.Select(t => t.ExamId).Distinct()),
                RetryAttempted = retryAttempted,
                SelectedLanguagesCount = selectedLanguagesCount,
                ScheduledTestsCount = scheduledTestsCount,
                TestsCreatedPerExam = testsCreatedPerExam,
                NoOfExamsForwhichTestsGiven = noOfExamsWithTests
            };
        }

        private EligibilityResultDto ValidateTestCreationEligibility(UserSubscriptionDto subscription, UserCurrentUsageDto usage)
        {
            var result = new EligibilityResultDto();

            if (usage.ActiveTests >= subscription.MaxActiveTests)
            {
                result.IsEligible = false;
                result.Messages.Add("Active test limit exceeded.");
            }

            if (usage.TestsCreatedPerExam >= subscription.MaxTestsPerExam)
            {
                result.IsEligible = false;
                result.Messages.Add("Maximum tests per exam exceeded.");
            }

            if (usage.NoOfExamsForwhichTestsGiven >= subscription.MaxExams)
            {
                result.IsEligible = false;
                result.Messages.Add("Maximum number of exams exceeded.");
            }

            // ✅ Max scheduled tests allowed
            if (subscription.CanScheduleTests && usage.ScheduledTestsCount >= subscription.MaxScheduledTestsAllowed)
            {
                result.IsEligible = false;
                result.Messages.Add("Scheduled test limit exceeded.");
            }

            // ✅ Max languages per test
            if (usage.SelectedLanguagesCount > subscription.MaxLanguages)
            {
                result.IsEligible = false;
                result.Messages.Add("Selected languages exceed your plan's allowed limit.");
            }

            // ✅ Retry logic
            if (!subscription.CanRetryTest)
            {
                result.IsEligible = false;
                result.Messages.Add("Your plan does not allow retrying tests.");
            }

            if (usage.RetryAttempted >= subscription.MaxTestAttempts)
            {
                result.IsEligible = false;
                result.Messages.Add("Maximum test retry attempts reached.");
            }

            return result;
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

            return await GetUserWithSubscriptionAsync(user.Id);
        }

        public Task<bool> CheckPasswordAsync(User user, string password) => _userManager.CheckPasswordAsync(user, password);
    }
}
