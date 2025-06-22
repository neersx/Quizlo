namespace Quizlo.Questionnaire.WebApi.DTO
{
    public class TestDetailsDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = default!;
        public TimeSpan Duration { get; set; }
        public DateTime CreatedAt { get; set; }
        public int ExamId { get; set; }
        public string ExamName { get; set; } = default!;
        public IReadOnlyList<QuestionDto> Questions { get; set; } = [];
    }
}
