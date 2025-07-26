using Quizlo.Questionnaire.WebApi.DTO;

namespace Quizlo.Questionnaire.WebApi.Services
{
    public interface IQuestionsHubService
    {
        Task<QuestionsHubDto> CreateAsync(QuestionsHubCreateDto dto);
        Task<IEnumerable<QuestionsHubDto>> GetAllAsync();
        Task<IEnumerable<QuestionsHubDto>> GetByExamAndSubjectAsync(int examId, int subjectId);
        Task<IReadOnlyList<QuestionDto>> GetQuestionsFromHubAsync(int subjectId, int questionsCount = 0);
        Task<int> IsQuestionCountSufficientAsync(int examId, int subjectId, int expectedCount);
        Task<IReadOnlyList<QuestionsHubDto>> InsertQuestionsAndHubAsync(int subjectId, int createdBy, IReadOnlyList<QuestionDto> questions, string? topic = null, CancellationToken cancellationToken = default);

    }

}