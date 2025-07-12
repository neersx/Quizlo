using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Quizlo.Questionnaire.WebApi.Data.Entities;
using Quizlo.Questionnaire.WebApi.DTO;

namespace Quizlo.Questionnaire.WebApi.MapProfiles
{
public class TestMappingProfile : Profile
{
    public TestMappingProfile()
    {
        CreateMap<Test, TestResultDto>()
            .ForMember(dest => dest.Answers, opt => opt.MapFrom(src => src.TestQuestions))
            .ForMember(dest => dest.TotalQuestions, opt => opt.MapFrom(src => src.TestQuestions.Count));

        CreateMap<TestQuestion, QuestionDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Question.Id))
            .ForMember(dest => dest.QuestionText, opt => opt.MapFrom(src => src.Question.QuestionText))
            .ForMember(dest => dest.QuestionNo, opt => opt.MapFrom(src => src.Order))
            .ForMember(dest => dest.OptionsJson, opt => opt.MapFrom(src => src.Question.OptionsJson))
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Question.Type))
            .ForMember(dest => dest.Difficulty, opt => opt.MapFrom(src => src.Question.Difficulty.ToString()))
            .ForMember(dest => dest.Explanation, opt => opt.MapFrom(src => src.Question.Explanation))
            .ForMember(dest => dest.CorrectOptionIds, opt => opt.MapFrom(src => src.Question.CorrectOptionIds))
            .ForMember(dest => dest.SelectedOptionIds, opt => opt.MapFrom(src => src.Question.SelectedOptionIds))
            .ForMember(dest => dest.IsCorrect, opt => opt.MapFrom(src => src.Question.IsCorrect ?? null))
            .ForMember(dest => dest.Marks, opt => opt.MapFrom(src => src.Question.Marks))
            .ForMember(dest => dest.MinusMarks, opt => opt.MapFrom(src => src.Question.MinusMarks))
            .ForMember(dest => dest.AnsweredAt, opt => opt.MapFrom(src => src.Question.AnsweredAt));
    }
}

}