using Microsoft.EntityFrameworkCore;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.Data;
using Quizlo.Questionnaire.WebApi.Services;
using Quizlo.Questionnaire.WebApi.DTO;
using AutoMapper;

namespace Quizlo.Questionnaire.WebApi.Services
{
    public class ExamService : IExamService
    {
        private readonly QuizDbContext _context;
        private readonly IMapper _mapper;

        public ExamService(QuizDbContext context)
            => _context = context;

        public async Task<Exam> GetExamAsync(int examId)
            => await _context.Exams
                             .Include(e => e.Subjects)
                             .FirstOrDefaultAsync(e => e.Id == examId);

        public async Task<List<ExamWithEmptySubjectsDto>> GetExamsWithSubjectsMissingQuestionsAsync(CancellationToken cancellationToken = default)
        {
            var examsWithEmptySubjects = await _context.Exams
                .Where(exam => exam.Subjects.Any(subject => subject.TotalQuestions < 20) && exam.IsTrending)
                .Select(exam => new ExamWithEmptySubjectsDto
                {
                    ExamId = exam.Id,
                    ExamName = exam.Name,
                    ExamCode = exam.Code,
                    Subjects = exam.Subjects
                        .Where(subject => subject.TotalQuestions == 0)
                        .Select(subject => new SubjectDto
                        {
                            SubjectId = subject.Id,
                            Name = subject.Title,
                            TotalQuestions = subject.TotalQuestions,
                            QuestionsInExam = subject.QuestionsInExam
                        }).ToList()
                }).ToListAsync(cancellationToken);

            return examsWithEmptySubjects;
        }

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

        public async Task<ExamResponseDto> CreateExamAsync(CreateExamDto dto, int userId, CancellationToken ct = default)
        {
            var exam = _mapper.Map<Exam>(dto);
            exam.CreatedByUserId = userId;

            _context.Exams.Add(exam);
            await _context.SaveChangesAsync(ct);

            return _mapper.Map<ExamResponseDto>(exam);
        }

        public async Task<ExamResponseDto> UpdateExamAsync(UpdateExamDto dto, CancellationToken ct = default)
        {
            var exam = await _context.Exams.FindAsync(new object[] { dto.Id }, ct);
            if (exam == null)
                throw new KeyNotFoundException($"Exam with Id {dto.Id} not found.");

            _mapper.Map(dto, exam);
            _context.Exams.Update(exam);
            await _context.SaveChangesAsync(ct);

            return _mapper.Map<ExamResponseDto>(exam);
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
