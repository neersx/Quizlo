namespace Quizlo.Questionnaire.WebApi.Data.Entities
{
    public class OTPRecord
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Code { get; set; }
        public DateTime ExpiresAt { get; set; }
        public bool IsUsed { get; set; }
    }
}
