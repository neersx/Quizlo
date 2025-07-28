namespace Quizlo.Questionnaire.WebApi.DTO
{
    public class UserSubscriptionDto
    {
        public string PlanName { get; set; }
        public int MaxExams { get; set; }
        public int MaxTestsPerExam { get; set; }
        public int MaxLanguages { get; set; }
        public int MaxActiveTests { get; set; }
        public bool CanRetryTest { get; set; }
        public int MaxTestAttempts { get; set; }
        public bool CanScheduleTests { get; set; }
        public bool ShowAnalytics { get; set; }
        public bool CanSelectDifficulty { get; set; }
        public bool DisplayTestTimeline { get; set; }
    }

}