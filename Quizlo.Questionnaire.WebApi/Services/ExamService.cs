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
                             .Include(e => e.Questions)
                             .FirstOrDefaultAsync(e => e.ExamId == examId);

        public async Task<IEnumerable<Exam>> GetExamsAsync(int pageNumber, int pageSize, string search = null)
        {
            var q = _context.Exams.AsQueryable();
            if (!string.IsNullOrEmpty(search))
                q = q.Where(e => EF.Functions.Like(e.ExamId.ToString(), $"%{search}%"));
            return await q.Include(e => e.Questions)
                          .Skip((pageNumber - 1) * pageSize)
                          .Take(pageSize)
                          .ToListAsync();
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
