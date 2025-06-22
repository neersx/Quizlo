using Quizlo.Questionnaire.WebApi.Helpers;

namespace Quizlo.Questionnaire.WebApi.DTO
{
    public class QuestionDto
    {
        public int Id { get; set; }
        public string QuestionText { get; set; } = default!;
        public string[] Options { get; set; } = default!;
        public string[] CorrectOption { get; set; } = default!;
        public string? Explanation { get; set; }
        public DifficultyLevel Difficulty { get; set; }
    }
}
