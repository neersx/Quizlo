using System;
using System.Text.RegularExpressions;
using AutoMapper;

namespace Quizlo.Questionnaire.WebApi.DTO
{
    /// <summary>
    /// Data Transfer Object for exposing blog details to the client.
    /// </summary>
    public class BlogDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string UrlName { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string Author { get; set; }
        public string Date { get; set; }
        public string HeartColor { get; set; }
        public string PageStyleClass { get; set; }
        public string ImageClass { get; set; }
        public string TextColor { get; set; }
        public string Avatar { get; set; }
        public string Link { get; set; }
        public string Summary { get; set; }
        public bool IsFeatured { get; set; } = false;
    }

    /// <summary>
    /// AutoMapper profile for mapping Blog entity to BlogDto.
    /// </summary>
    public class BlogMappingProfile : Profile
    {
        public BlogMappingProfile()
        {
            CreateMap<Blog, BlogDto>()
            .ForMember(dest => dest.Id,
                           opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Title,
                           opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.UrlName,
                           opt => opt.MapFrom(src => GenerateSlug(src.Title)))
                .ForMember(dest => dest.Description,
                           opt => opt.MapFrom(src => src.HtmlContent))
                .ForMember(dest => dest.Summary,
                           opt => opt.MapFrom(src => src.Summary))
                .ForMember(dest => dest.Image,
                           opt => opt.MapFrom(src => src.ImageUrl))
                .ForMember(dest => dest.Author,
                           opt => opt.MapFrom(src => src.Author))
                .ForMember(dest => dest.Date,
                           opt => opt.MapFrom(src => src.CreatedAt.ToString("dd, MMM yyyy - HH:mm")))
                .ForMember(dest => dest.HeartColor,
                           opt => opt.MapFrom(_ => "ri-heart-line text-danger"))
                .ForMember(dest => dest.PageStyleClass,
                           opt => opt.MapFrom(_ => "p-3 pb-0 rounded-5"))
                .ForMember(dest => dest.ImageClass,
                           opt => opt.MapFrom(_ => "rounded-3"))
                .ForMember(dest => dest.TextColor,
                           opt => opt.MapFrom(_ => "primary"))
                .ForMember(dest => dest.IsFeatured,
                            opt => opt.MapFrom(src => src.IsFeatured))     
                .ForMember(dest => dest.Avatar,
                           opt => opt.MapFrom(_ => "./assets/images/faces/5.jpg"))
                .ForMember(dest => dest.Link,
                           opt => opt.MapFrom(src => $"{GenerateSlug(src.Title)}"));
        }

         private static string GenerateSlug(string phrase)
        {
            var str = phrase.ToLowerInvariant();
            // remove invalid chars
            str = Regex.Replace(str, @"[^a-z0-9\s-]", string.Empty);
            // collapse whitespace
            str = Regex.Replace(str, @"\s+", " ").Trim();
            // limit length
            str = str.Substring(0, str.Length <= 45 ? str.Length : 45).Trim();
            // replace spaces with hyphens
            str = Regex.Replace(str, @"\s", "-");
            return str;
        }
    }
}
