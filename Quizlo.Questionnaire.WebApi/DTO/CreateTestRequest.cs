using Quizlo.Questionnaire.WebApi.Helpers;

namespace Quizlo.Questionnaire.WebApi.DTO
{
    public record CreateTestRequest(
        int Id,
        int ExamId,
        string ExamName,
        string ExamCode,
        int NumberOfQuestions,
        string? Title,
        string? Subject,
        string? Language = "English",
        DifficultyLevel Difficulty = DifficultyLevel.Mix,
        bool HasAiQuestions = false,
        TimeSpan? Duration = null);
}
