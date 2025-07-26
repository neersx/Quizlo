using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.Helpers.Constants;

namespace Quizlo.Questionnaire.WebApi.DTO
{
    public class TestDetailsDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = default!;
        public string Language { get; set; } = default!;
        public string? Subject { get; set; } = default!;
        public TimeSpan Duration { get; set; }
        public TimeSpan? DurationCompltedIn { get; set; }
        public DateTime CreatedAt { get; set; }
        public int ExamId { get; set; }
        public int? SubjectId { get; set; }
        public int TotalQuestions { get; set; }
        public int AvailableQuesInHub { get; set; } = 0;
        public double? TotalMarks { get; set; }
        public double? MarksScored { get; init; }
        public string ExamName { get; set; } = default!;
        public string ExamCode { get; set; }
        public string ImageUrl { get; set; }
        public string Status { get; set; } = TestStatus.NotStarted;
        public IReadOnlyList<QuestionDto> Questions { get; set; } = [];
    }
}
