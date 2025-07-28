namespace Quizlo.Questionnaire.WebApi.DTO
{
    public class UserWithSubscriptionDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public SubscriptionDto Subscription { get; set; }
    }

    public class SubscriptionDto
    {
        public string PlanName { get; set; }
        public DateTime SubscribedOn { get; set; }
        public DateTime ValidTill { get; set; }
    }

}