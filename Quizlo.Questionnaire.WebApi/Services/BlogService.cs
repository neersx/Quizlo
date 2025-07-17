using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Quizlo.Questionnaire.WebApi.Data;
using Quizlo.Questionnaire.WebApi.DTO;

public interface IBlogService
{
    Task<IEnumerable<BlogListDto>> GetAllAsync();
    Task<IEnumerable<BlogListDto>> GetAllAsync(string status);
    Task<BlogDto> GetByIdAsync(long id);
    Task<BlogDto> GetByLinkAsync(string link);
    Task<Blog> UpdateAsync(long id, BlogCreateDto updated);

    Task<Blog> CreateDraftAsync(CreateDraftBlogDto dto, int createdByUserId);

    Task<Blog> CreateAsync(BlogCreateDto dto);
}

public class BlogService : IBlogService
{
    private readonly QuizDbContext _db;
    private readonly IMapper _mapper;
    public BlogService(QuizDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }
    public async Task<IEnumerable<BlogListDto>> GetAllAsync()
    {
        return await _db.Blogs.Where(b => b.Status == "Published")
            .ProjectTo<BlogListDto>(_mapper.ConfigurationProvider)
            .OrderByDescending(b => b.Id)
            .ToListAsync();
    }

    public async Task<IEnumerable<BlogListDto>> GetAllAsync(string status)
    {
        return await _db.Blogs.Where(b => b.Status == status)
            .OrderByDescending(b => b.CreatedAt)
            .ProjectTo<BlogListDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<BlogDto> GetByLinkAsync(string link)
    {
        var entity = await _db.Blogs.FirstOrDefaultAsync(b => b.SharedLink == link);
        if (entity == null) return null;
        return _mapper.Map<BlogDto>(entity);
    }

    public async Task<BlogDto> GetByIdAsync(long id)
    {
        var entity = await _db.Blogs.FindAsync(id);
        if (entity == null) return null;
        return _mapper.Map<BlogDto>(entity);
    }

    public async Task<Blog> CreateAsync(BlogCreateDto dto)
    {

        var entity = await _db.Blogs.FirstOrDefaultAsync(b => b.SharedLink == dto.SharedLink);
        if (entity == null)
        {
            var blog = _mapper.Map<Blog>(dto);
            _db.Set<Blog>().Add(blog);
            await _db.SaveChangesAsync();
            return blog;
        }
        throw new Exception("Blog already exists with the same slug. Try to place update request if reuquired.");

    }

    public async Task<Blog> CreateDraftAsync(CreateDraftBlogDto dto, int createdByUserId)
    {
        var blog = new Blog
        {
            Title = dto.Title,
            SharedLink = dto.Slug,
            Tags = dto.Keywords.Any() ? string.Join(',', dto.Keywords) : null,
            Summary = dto.Summary,
            HtmlContent = dto.HtmlContent,
            CreatedAt = dto.PublishedDate,
            CreatedBy = createdByUserId,
            Status = "Draft",   // default, but shown here for clarity
            Type = dto.Type
        };

        _db.Blogs.Add(blog);
        await _db.SaveChangesAsync();
        return blog;
    }

    public async Task<Blog> UpdateAsync(long id, BlogCreateDto updated)
    {
        var blog = await _db.Blogs.FindAsync(id);
        if (blog == null) return null;

        // copy updatable fields
        blog.HtmlContent = updated.HtmlContent;
        blog.Type = updated.Type;
        blog.Title = updated.Title;
        blog.Tags = updated.Tags;
        blog.IsFeatured = updated.IsFeatured || blog.IsFeatured;
        blog.SharedLink = updated.SharedLink ?? blog.SharedLink;
        blog.Summary = updated.Summary;
        blog.Author = updated.Author;
        blog.Status = updated.Status;
        blog.ImageUrl = updated.ImageUrl;
        blog.UpdatedAt = DateTime.UtcNow;
        blog.Category = updated.Category ?? blog.Category;

        await _db.SaveChangesAsync();
        return blog;
    }
}
