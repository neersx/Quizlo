using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using AutoMapper;

namespace Quizlo.Questionnaire.WebApi.DTO
{

    public class BlogCreateDto
    {
        public int Id { get; set; }
        [Required]
        public string HtmlContent { get; set; }

        [Required, StringLength(20)]
        public string Type { get; set; }

        [Required, StringLength(250)]
        public string Title { get; set; }

        [StringLength(250)]
        public string? Tags { get; set; }

        [StringLength(270)]
        public string? SharedLink { get; set; }

        [StringLength(520)]
        public string? Summary { get; set; }

        [StringLength(50)]
        public string? Author { get; set; }

        [Required, StringLength(20)]
        public string Status { get; set; }

        [StringLength(500)]
        public string? ImageUrl { get; set; }
        public string? Category { get; set; }

        public bool IsFeatured { get; set; }
    }

    public class BulkCreateDraftBlogsRequest
    {
        public List<CreateDraftBlogDto> Blogs { get; set; } = new();
    }

    public class DraftBlogUpsertDto : CreateDraftBlogDto
    {
        public int? Id { get; set; } // null => create, non-null => update existing
    }


    public class CreateDraftBlogDto
    {
        [Required, StringLength(250)]
        public string Title { get; set; }

        [Required, StringLength(270)]
        public string Slug { get; set; }

        public List<string> Keywords { get; set; } = new();

        public List<string> Hashtags { get; set; } = new();

        [StringLength(520)]
        public string Summary { get; set; }

         public string? Category { get; set; }

        // maps to Blog.HtmlContent (required)
        public string HtmlContent { get; set; } = String.Empty;

        public string Type { get; set; } = "General";
    }

    public class BlogTitlesDto
    {
        public string Slug { get; set; }
        public string Title { get; set; }

    }

    public class BlogListDto
        {
            public int Id { get; set; }
            public string Title { get; set; }
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
            public string Tags { get; set; }
            public string Type { get; set; }
            public bool IsFeatured { get; set; } = false;
        }

    public class BlogListMappingProfile : Profile
    {
        public BlogListMappingProfile()
        {

            CreateMap<Blog, BlogListDto>()
            .ForMember(dest => dest.Id,
                           opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Title,
                           opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Summary,
                           opt => opt.MapFrom(src => src.Summary))
                .ForMember(dest => dest.Author,
                           opt => opt.MapFrom(src => src.Author))
                .ForMember(dest => dest.Type,
                           opt => opt.MapFrom(src => src.Type))
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
                           opt => opt.MapFrom(_ => "https://quizloai.com/assets/images/faces/5.jpg"))
               .ForMember(dest => dest.Image,
                       opt => opt.MapFrom(src =>
                           string.IsNullOrWhiteSpace(src.ImageUrl)
                               ? null
                               : (src.ImageUrl.StartsWith("http", StringComparison.OrdinalIgnoreCase)
                                   ? src.ImageUrl
                                   : $"https://quizloai.com/{src.ImageUrl}")))

              .ForMember(dest => dest.Link,
                       opt => opt.MapFrom(src => $"https://quizloai.com/blogs/blog-details/{src.SharedLink}"));
        }
    }

    public class BlogDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string UrlName { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string Author { get; set; }
        public string Date { get; set; }
        public string HeartColor { get; set; }
        public string Status { get; set; } = "Draft";
        public string PageStyleClass { get; set; }
        public string ImageClass { get; set; }
        public string TextColor { get; set; }
        public string Avatar { get; set; }
        public string Link { get; set; }
        public string Summary { get; set; }
        public string Tags { get; set; }
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
                           opt => opt.MapFrom(src => src.SharedLink))
                .ForMember(dest => dest.Description,
                           opt => opt.MapFrom(src => src.HtmlContent))
                .ForMember(dest => dest.Summary,
                           opt => opt.MapFrom(src => src.Summary))
                .ForMember(dest => dest.Image,
                       opt => opt.MapFrom(src =>
                           string.IsNullOrWhiteSpace(src.ImageUrl)
                               ? null
                               : (src.ImageUrl.StartsWith("http", StringComparison.OrdinalIgnoreCase)
                                   ? src.ImageUrl
                                   : $"https://quizloai.com/{src.ImageUrl}")))
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
                           opt => opt.MapFrom(_ => "/assets/images/faces/5.jpg"))
                .ForMember(dest => dest.Link,
                       opt => opt.MapFrom(src => $"https://quizloai.com/blogs/blog-details/{src.SharedLink}"));
        }

        private static string GenerateSlug(string phrase)
        {
            var str = phrase.ToLowerInvariant();
            // remove invalid chars
            str = Regex.Replace(str, @"[^a-z0-9\s-]", string.Empty);
            // collapse whitespace
            str = Regex.Replace(str, @"\s+", " ").Trim();
            // limit length
            str = str.Substring(0, str.Length <= 75 ? str.Length : 75).Trim();
            // replace spaces with hyphens
            str = Regex.Replace(str, @"\s", "-");
            return str;
        }
    }
}
