namespace Quizlo.Questionnaire.WebApi.Helpers.Constants
{

    public static class TestStatus
    {
        public const string InCompleted = "InCompleted";
        public const string Passed = "Passed";
        public const string Failed = "Failed";
         public const string Started = "Started"; // When questions are generated or loaded to test window
        public const string NotStarted = "Not Started"; 
        public const string Scheduled = "Scheduled";
        public const string Cancelled = "Cancelled";
        public const string Completed = "Completed";
    }
}
