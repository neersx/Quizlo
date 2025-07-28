using Microsoft.EntityFrameworkCore;
using Quizlo.Questionnaire.WebApi.Data;

public interface ISubscriptionService
{
    Task<UserSubscription?> GetActiveSubscriptionAsync(int userId);
    Task<SubscriptionPlan?> GetCurrentPlanAsync(int userId);
    Task<bool> HasFeatureAsync(int userId, Func<SubscriptionPlan, bool> featurePredicate);
}


public class SubscriptionService : ISubscriptionService
{
    private readonly QuizDbContext _context;

    public SubscriptionService(QuizDbContext context)
    {
        _context = context;
    }

    public async Task<UserSubscription?> GetActiveSubscriptionAsync(int userId)
    {
        return await _context.UserSubscriptions
            .Include(us => us.SubscriptionPlan)
            .Where(us => us.UserId == userId && us.ValidTill >= DateTime.UtcNow)
            .OrderByDescending(us => us.ValidTill)
            .FirstOrDefaultAsync();
    }

    public async Task<SubscriptionPlan?> GetCurrentPlanAsync(int userId)
    {
        var sub = await GetActiveSubscriptionAsync(userId);
        return sub?.SubscriptionPlan;
    }

    public async Task<bool> HasFeatureAsync(int userId, Func<SubscriptionPlan, bool> featurePredicate)
    {
        var plan = await GetCurrentPlanAsync(userId);
        return plan != null && featurePredicate(plan);
    }
}
