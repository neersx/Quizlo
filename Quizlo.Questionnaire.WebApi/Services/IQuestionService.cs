using Quizlo.Questionnaire.WebApi.Data.Entities;

namespace Quizlo.Questionnaire.WebApi.Services
{
    public interface IQuestionService
    {
        Task<Question> GetQuestionAsync(int questionId);
        Task<IEnumerable<Question>> GetQuestionsByExamAsync(int examId);
        Task<Question> CreateQuestionAsync(Question question);
        Task<Question> UpdateQuestionAsync(Question question);
        Task<bool> DeleteQuestionAsync(int questionId);
    }
}
