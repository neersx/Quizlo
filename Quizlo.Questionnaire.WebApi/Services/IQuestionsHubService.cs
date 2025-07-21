using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quizlo.Questionnaire.WebApi.DTO;

namespace Quizlo.Questionnaire.WebApi.Services
{
    public interface IQuestionsHubService
    {
        Task<QuestionsHubDto> CreateAsync(QuestionsHubCreateDto dto);
        Task<IEnumerable<QuestionsHubDto>> GetAllAsync();
        Task<IEnumerable<QuestionsHubDto>> GetByExamAndSubjectAsync(int examId, int subjectId);
    }

}