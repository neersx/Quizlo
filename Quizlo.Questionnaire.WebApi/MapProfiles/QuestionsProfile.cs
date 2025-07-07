using AutoMapper;
using Quizlo.Questionnaire.WebApi.DTO;

namespace Quizlo.Questionnaire.WebApi.MapProfiles
{
    public class QuestionsProfile : Profile
    {
        public QuestionsProfile()
        {
            CreateMap<Data.Entities.Question, QuestionDto>()
              .ForMember(dest => dest.AnsweredAt, opt => opt.MapFrom(src => src.AnsweredAt));
        }
    }
}