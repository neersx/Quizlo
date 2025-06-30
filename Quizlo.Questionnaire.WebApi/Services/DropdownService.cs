using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Quizlo.Questionnaire.WebApi.Data;
using Quizlo.Questionnaire.WebApi.DTO;

namespace Quizlo.Questionnaire.WebApi.Services
{

    public interface IDropdownService
    {
        Task<List<SelectOptionDto>> GetSubjectsByExamIdAsync(int examId);
    }
    public class DropdownService : IDropdownService
    {
        private readonly QuizDbContext _context;

        public DropdownService(QuizDbContext context)
            => _context = context;

        public async Task<List<SelectOptionDto>> GetSubjectsByExamIdAsync(int examId)
        {
            return await _context.Subjects
                .Where(s => s.ExamId == examId && !s.IsDeleted)
                .Select(s => new SelectOptionDto
                {
                    Label = s.Title,
                    Value = s.Id.ToString()
                })
                .ToListAsync();
        }
    }
}