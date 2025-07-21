using Quizlo.Questionnaire.WebApi.DTO;

namespace Quizlo.Questionnaire.WebApi.Services
{
    public interface IQuestionsHubService
    {
        Task<QuestionsHubDto> CreateAsync(QuestionsHubCreateDto dto);
        Task<IEnumerable<QuestionsHubDto>> GetAllAsync();
        Task<IEnumerable<QuestionsHubDto>> GetByExamAndSubjectAsync(int examId, int subjectId);
        Task<IReadOnlyList<QuestionDto>> GetQuestionsFromHubAsync(int examId, int subjectId, int questionsCount = 0);
        Task<bool> IsQuestionCountSufficientAsync(int examId, int subjectId, int expectedCount);

    }

}