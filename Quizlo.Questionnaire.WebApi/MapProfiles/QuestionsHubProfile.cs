using AutoMapper;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.DTO;

public class QuestionsHubProfile : Profile
{
    public QuestionsHubProfile()
    {
        CreateMap<QuestionsHub, QuestionsHubDto>()
            .ForMember(dest => dest.ExamName, opt => opt.MapFrom(src => src.Exam.Name))
            .ForMember(dest => dest.SubjectTitle, opt => opt.MapFrom(src => src.Subject.Title))
            .ForMember(dest => dest.QuestionText, opt => opt.MapFrom(src => src.Question.QuestionText));

        CreateMap<QuestionsHubCreateDto, QuestionsHub>()
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
            .ForMember(dest => dest.IsActive, opt => opt.MapFrom(_ => true));
    }
}
