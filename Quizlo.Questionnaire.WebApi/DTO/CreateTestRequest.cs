using Quizlo.Questionnaire.WebApi.Helpers;

namespace Quizlo.Questionnaire.WebApi.DTO
{
    public record CreateTestRequest(
        int ExamId,
        int NumberOfQuestions,
        DifficultyLevel Difficulty,
        string? Title,
        TimeSpan? Duration);
}
