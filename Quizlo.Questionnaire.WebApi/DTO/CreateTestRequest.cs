using Quizlo.Questionnaire.WebApi.Helpers;

namespace Quizlo.Questionnaire.WebApi.DTO
{
    public record CreateTestRequest(
        int Id,
        int ExamId,
        string ExamName,
        string ExamCode,
        int NumberOfQuestions,
        string? Subject,
        string? Language,
        DifficultyLevel Difficulty,
        string? Title,
        bool HasAiQuestions,
        TimeSpan? Duration);
}
