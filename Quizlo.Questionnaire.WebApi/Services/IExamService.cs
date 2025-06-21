using Quizlo.Questionnaire.WebApi.Data.Entities;

namespace Quizlo.Questionnaire.WebApi.Services
{
    public interface IExamService
    {
        Task<Exam> GetExamAsync(int examId);
        Task<IEnumerable<Exam>> GetExamsAsync(int pageNumber, int pageSize, string search = null);
        Task<Exam> CreateExamAsync(Exam exam);
        Task<Exam> UpdateExamAsync(Exam exam);
        Task<bool> DeleteExamAsync(int examId);
    }
}
