using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Quizlo.Questionnaire.WebApi.DTO;

public interface IBlogService
{
    Task<IEnumerable<BlogDto>> GetAllAsync();
    Task<BlogDto> GetByIdAsync(long id);
    Task<Blog> UpdateAsync(long id, Blog updated);
}

public class BlogService : IBlogService
{
    private readonly SupabaseDbContext _db;
    private readonly IMapper _mapper;
    public BlogService(SupabaseDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }
    public async Task<IEnumerable<BlogDto>> GetAllAsync()
    {
        return await _db.QuizloBlogs
            .OrderByDescending(b => b.CreatedAt)
            .ProjectTo<BlogDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
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
