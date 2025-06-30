using Microsoft.EntityFrameworkCore;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.Data;
using Quizlo.Questionnaire.WebApi.Services;

namespace Quizlo.Questionnaire.WebApi.Services
{
    public class ExamService : IExamService
    {
        private readonly QuizDbContext _context;

        public ExamService(QuizDbContext context)
            => _context = context;

        public async Task<Exam> GetExamAsync(int examId)
            => await _context.Exams
                             .Include(e => e.Tests)
                             .FirstOrDefaultAsync(e => e.Id == examId);

        public async Task<IEnumerable<Exam>> GetExamsAsync(int pageNumber, int pageSize, string search = null)
        {
            var q = _context.Exams.AsQueryable();
            if (!string.IsNullOrEmpty(search))
                q = q.Where(e => EF.Functions.Like(e.Id.ToString(), $"%{search}%"));
            var result = await q
                          .Skip((pageNumber - 1) * pageSize)
                          .Take(pageSize)
                          .ToListAsync();
            return result;
        }

        public async Task<Exam> CreateExamAsync(Exam exam)
        {
            _context.Exams.Add(exam);
            await _context.SaveChangesAsync();
            return exam;
        }

        public async Task<Exam> UpdateExamAsync(Exam exam)
        {
            _context.Exams.Update(exam);
            await _context.SaveChangesAsync();
            return exam;
        }

        public async Task<bool> DeleteExamAsync(int examId)
        {
            var exam = await _context.Exams.FindAsync(examId);
            if (exam == null) return false;
            _context.Exams.Remove(exam);
            await _context.SaveChangesAsync();
            return true;
        }
        
    }
}
