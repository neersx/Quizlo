using Quizlo.Questionnaire.WebApi.Helpers;

namespace Quizlo.Questionnaire.WebApi.DTO
{
    public record CreateTestRequest(
        int ExamId,
        int NumberOfQuestions,
        string? Subject,
        string? Language,
        DifficultyLevel Difficulty,
        string? Title,
        TimeSpan? Duration);
}
