using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.DTO;

namespace Quizlo.Questionnaire.WebApi.Services
{
    public interface IExamService
    {
        Task<Exam> GetExamAsync(int examId);
        Task<List<ExamWithEmptySubjectsDto>> GetExamsWithSubjectsMissingQuestionsAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<Exam>> GetExamsAsync(int pageNumber, int pageSize, string search = null);
        Task<ExamResponseDto> CreateExamAsync(CreateExamDto dto, int userId, CancellationToken ct = default);
        Task<ExamResponseDto> UpdateExamAsync(UpdateExamDto dto, CancellationToken ct = default);
        Task<bool> DeleteExamAsync(int examId);
    }
}
