using Microsoft.EntityFrameworkCore;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.Data;
using Quizlo.Questionnaire.WebApi.Services;

namespace Quizlo.Questionnaire.WebApi.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly QuizDbContext _context;

        public QuestionService(QuizDbContext context)
            => _context = context;

        public async Task<Question> GetQuestionAsync(int questionId)
            => await _context.Questions.FindAsync(questionId);

        public async Task<IEnumerable<Question>> GetQuestionsByExamAsync(int examId)
            => await _context.Questions
                             .Where(q => q.ExamId == examId)
                             .ToListAsync();

        public async Task<Question> CreateQuestionAsync(Question question)
        {
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();
            return question;
        }

        public async Task<Question> UpdateQuestionAsync(Question question)
        {
            _context.Questions.Update(question);
            await _context.SaveChangesAsync();
            return question;
        }

        public async Task<bool> DeleteQuestionAsync(int questionId)
        {
            var q = await _context.Questions.FindAsync(questionId);
            if (q == null) return false;
            _context.Questions.Remove(q);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
