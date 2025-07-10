using AutoMapper;
using Quizlo.Questionnaire.WebApi.DTO;

public class BlogProfile : Profile
{
    public BlogProfile()
    {
        CreateMap<BlogCreateDto, Blog>()
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(_ => 1))
            .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
            .ForMember(dest => dest.Reviews, opt => opt.Ignore())
            .ForMember(dest => dest.Ratings, opt => opt.Ignore())
            .ForMember(dest => dest.Likes, opt => opt.Ignore());
    }
}