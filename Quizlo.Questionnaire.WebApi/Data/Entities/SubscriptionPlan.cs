using System.ComponentModel.DataAnnotations;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.Helpers.Constants.enums;

public class SubscriptionPlan
{
    public int Id { get; set; }

    [MaxLength(100)]
    public string Name { get; set; } = string.Empty; // Beginner, Intermediate, Expert

    [MaxLength(500)]
    public string Description { get; set; }

    public decimal Price { get; set; }
    public int DurationInDays { get; set; } // e.g., 30, 90, 365

    // Capabilities
    public int MaxExamsAllowed { get; set; }
    public int MaxTestsPerExam { get; set; }
    public int MaxLanguagesPerTest { get; set; }
    public int MaxActiveTests { get; set; }
    public bool AllowRetry { get; set; }
    public int MaxTestAttempts { get; set; }
    public bool HasTestTimeline { get; set; }
    public bool AllowDifficultySelection { get; set; }
    public bool AllowTestScheduling { get; set; }
    public bool HasProgressTracking { get; set; }
    public bool HasAnalytics { get; set; }

    // Bonus Capabilities
    public bool HasCertification { get; set; }
    public bool CanAccessPremiumTests { get; set; }
    public bool HasAIRecommendations { get; set; }
    public bool AdFreeExperience { get; set; }
    public SubscriptionLevel Level { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<UserSubscription> UserSubscriptions { get; set; } = new List<UserSubscription>();
}

public class UserSubscription
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public User User { get; set; }

    public int SubscriptionPlanId { get; set; }
    public SubscriptionPlan SubscriptionPlan { get; set; }

    public DateTime SubscribedOn { get; set; } = DateTime.UtcNow;
    public DateTime ValidTill { get; set; }

    public bool IsActive => DateTime.UtcNow <= ValidTill;

    [MaxLength(100)]
    public string PaymentTransactionId { get; set; } // Optional if integrated with payment gateways

    public bool AutoRenew { get; set; } = false;
}

