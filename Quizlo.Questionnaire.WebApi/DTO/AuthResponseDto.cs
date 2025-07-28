namespace Quizlo.Questionnaire.WebApi.DTO
{
    public class AuthResponseDto
    {
        public string Token { get; set; }
        public int UserId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserSubscriptionDto Subscription { get; set; }
    }
}