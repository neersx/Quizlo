using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Quizlo.Questionnaire.WebApi.DTO;
using static Postgrest.Constants;

public interface IBlogService
{
    Task<IEnumerable<BlogDto>> GetAllAsync();
    Task<IEnumerable<BlogDto>> GetAllAsync(string status);
    Task<BlogDto> GetByIdAsync(long id);
    Task<BlogDto> GetByLinkAsync(string link);
    Task<Blog> UpdateAsync(long id, Blog updated);
}

public class BlogService : IBlogService
{
    private readonly SupabaseDbContext _db;
    private readonly Supabase.Client _client;
    private readonly IMapper _mapper;
    public BlogService(SupabaseDbContext db, IMapper mapper, Supabase.Client client)
    {
        _db = db;
        _client = client;
        _mapper = mapper;
    }
    public async Task<IEnumerable<BlogDto>> GetAllAsync()
    {
        // Fix for CS1501: Specify the generic type for the 'From' method.  
        var response = await _client
           .From<Blog>()              // target the Blog table
           .Select("*")
           .Where(b => b.Status == "Published")              // WHERE status = 'Published' :contentReference[oaicite:1]{index=1}
           .Order(b => b.CreatedAt, Ordering.Descending)     // ORDER BY createdAt DESC :contentReference[oaicite:2]{index=2}
           .Get();

        return response.Models
                       .Select(b => _mapper.Map<BlogDto>(b))
                       .ToList();
    }

    public async Task<IEnumerable<BlogDto>> GetAllAsync(string status)
    {
        return await _db.QuizloBlogs.Where(b => b.Status == status)
            .OrderByDescending(b => b.CreatedAt)
            .ProjectTo<BlogDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<BlogDto> GetByLinkAsync(string link)
    {
        var entity = await _db.QuizloBlogs.FirstOrDefaultAsync(b => b.SharedLink == link);
        if (entity == null) return null;
        return _mapper.Map<BlogDto>(entity);
    }

    public async Task<BlogDto> GetByIdAsync(long id)
    {
        var entity = await _db.QuizloBlogs.FindAsync(id);
        if (entity == null) return null;
        return _mapper.Map<BlogDto>(entity);
    }

    public async Task<Blog> UpdateAsync(long id, Blog updated)
    {
        var blog = await _db.QuizloBlogs.FindAsync(id);
        if (blog == null) return null;

        // copy updatable fields
        // blog.HtmlContent = updated.HtmlContent;
        blog.Reviews = updated.Reviews;
        blog.Type = updated.Type;
        blog.Title = updated.Title;
        blog.Tags = updated.Tags;
        blog.IsFeatured = updated.IsFeatured;
        blog.SharedLink = updated.SharedLink;
        blog.Summary = updated.Summary;
        blog.Author = updated.Author;
        blog.Status = updated.Status;
        blog.ImageUrl = updated.ImageUrl;
        blog.SocialMediaLinks = updated.SocialMediaLinks;

        await _db.SaveChangesAsync();
        return blog;
    }
}
