using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Quizlo.Questionnaire.WebApi.DTO;
using Quizlo.Questionnaire.WebApi.Services;
using Quizlo.Questionnaire.WebApi.Data;
using Quizlo.Questionnaire.WebApi.Data.Entities;

public class QuestionsHubService : IQuestionsHubService
{
    private readonly QuizDbContext _context;
    private readonly IMapper _mapper;

    public QuestionsHubService(QuizDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<QuestionsHubDto> CreateAsync(QuestionsHubCreateDto dto)
    {
        var entity = _mapper.Map<QuestionsHub>(dto);

        // Validate foreign keys
        if (!await _context.Exams.AnyAsync(e => e.Id == dto.ExamId))
            throw new Exception("Invalid ExamId.");
        if (!await _context.Subjects.AnyAsync(s => s.Id == dto.SubjectId))
            throw new Exception("Invalid SubjectId.");
        if (!await _context.Questions.AnyAsync(q => q.Id == dto.QuestionId))
            throw new Exception("Invalid QuestionId.");

        _context.QuestionsHubs.Add(entity);
        await _context.SaveChangesAsync();

        return _mapper.Map<QuestionsHubDto>(entity);
    }

    public async Task<IEnumerable<QuestionsHubDto>> GetAllAsync()
    {
        return await _context.QuestionsHubs
            .Include(qh => qh.Exam)
            .Include(qh => qh.Subject)
            .Include(qh => qh.Question)
            .ProjectTo<QuestionsHubDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<IEnumerable<QuestionsHubDto>> GetByExamAndSubjectAsync(int examId, int subjectId)
    {
        return await _context.QuestionsHubs
            .Where(qh => qh.ExamId == examId && qh.SubjectId == subjectId)
            .Include(qh => qh.Exam)
            .Include(qh => qh.Subject)
            .Include(qh => qh.Question)
            .ProjectTo<QuestionsHubDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }
}
