using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Quizlo.Questionnaire.WebApi.Data;
using Quizlo.Questionnaire.WebApi.DTO;

public interface IBlogService
{
    Task<IEnumerable<BlogListDto>> GetAllAsync();
    Task<Dictionary<string, string>> GetAllTitlesAsync();
    Task<IEnumerable<BlogListDto>> GetAllAsync(string status);
    Task<BlogDto> GetByIdAsync(int id);
    Task<BlogDto> GetByLinkAsync(string link);
    Task<Blog> UpdateAsync(int id, BlogCreateDto updated);

    Task<Blog> CreateDraftAsync(CreateDraftBlogDto dto, int createdByUserId);
    Task<IReadOnlyList<Blog>> CreateDraftsAsync(IEnumerable<CreateDraftBlogDto> dtos, int createdByUserId, CancellationToken ct = default);
    Task<IReadOnlyList<Blog>> UpsertDraftsAsync(IEnumerable<DraftBlogUpsertDto> dtos, int userId, CancellationToken ct = default);
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
            .OrderByDescending(b => b.UpdatedAt).ThenByDescending(b => b.CreatedAt)
            .ProjectTo<BlogListDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<Dictionary<string, string>> GetAllTitlesAsync()
    {
        return await _db.Blogs.AsNoTracking().ToDictionaryAsync(b => b.SharedLink, b => b.Title);
    }

    public async Task<IEnumerable<BlogListDto>> GetAllAsync(string status)
    {
        return await _db.Blogs.Where(b => b.Status == status)
            .OrderByDescending(b => b.UpdatedAt).ThenByDescending(b => b.CreatedAt)
            .ProjectTo<BlogListDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<BlogDto> GetByLinkAsync(string link)
    {
        var entity = await _db.Blogs.FirstOrDefaultAsync(b => b.SharedLink == link);
        if (entity == null) return null;
        return _mapper.Map<BlogDto>(entity);
    }

    public async Task<BlogDto> GetByIdAsync(int id)
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

    public async Task<IReadOnlyList<Blog>> CreateDraftsAsync(IEnumerable<CreateDraftBlogDto> dtos, int createdByUserId, CancellationToken ct = default)
    {
        if (dtos is null) throw new ArgumentNullException(nameof(dtos));

        var blogs = new List<Blog>();

        foreach (var dto in dtos)
        {
            ValidateCreateDto(dto); // optional: throw if invalid
            var blog = MapToNewBlog(dto, createdByUserId);
            blogs.Add(blog);
        }

        await _db.Blogs.AddRangeAsync(blogs, ct);
        await _db.SaveChangesAsync(ct);

        return blogs;
    }

    private static Blog MapToNewBlog(CreateDraftBlogDto dto, int createdByUserId)
    {
        return new Blog
        {
            Title = dto.Title,
            SharedLink = dto.Slug, // assuming slug stored in SharedLink
            Tags = (dto.Keywords != null && dto.Keywords.Count > 0)
                            ? string.Join(',', dto.Keywords)
                            : null,
            Summary = dto.Summary,
            HtmlContent = dto.HtmlContent,
            CreatedAt = DateTime.UtcNow, // confirm: is this actually published? or draft created?
            CreatedBy = createdByUserId,
            Status = "Draft",
            Type = dto.Type,
            Category = dto.Category

        };
    }

    private static void ValidateCreateDto(CreateDraftBlogDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Title))
            throw new ArgumentException("Title is required.", nameof(dto));
        if (string.IsNullOrWhiteSpace(dto.Slug))
            throw new ArgumentException("Slug is required.", nameof(dto));
        // Add slug format checks, length checks, etc.
    }


    public async Task<IReadOnlyList<Blog>> UpsertDraftsAsync(IEnumerable<DraftBlogUpsertDto> dtos, int userId, CancellationToken ct = default)
    {
        if (dtos is null) throw new ArgumentNullException(nameof(dtos));

        var now = DateTime.UtcNow; // fallback if needed
        var toCreate = new List<Blog>();
        var toUpdate = new List<Blog>();

        // Preload existing blogs in one DB hit when there are Ids
        var ids = dtos.Where(d => d.Id.HasValue).Select(d => d.Id!.Value).Distinct().ToList();
        var existingById = new Dictionary<int, Blog>();
        if (ids.Count > 0)
        {
            var existing = await _db.Blogs
                .Where(b => ids.Contains(b.Id))
                .ToListAsync(ct);
            existingById = existing.ToDictionary(b => b.Id);
        }

        foreach (var dto in dtos)
        {
            if (dto.Id is null)
            {
                // New
                ValidateCreateDto(dto);
                var blog = MapToNewBlog(dto, userId);
                toCreate.Add(blog);
            }
            else
            {
                // Update existing
                if (!existingById.TryGetValue(dto.Id.Value, out var blog))
                {
                    // Strategy choice: skip, throw, or create? Here: throw
                    throw new KeyNotFoundException($"Blog Id {dto.Id.Value} not found.");
                }

                // Apply updates
                blog.Title = dto.Title;
                blog.SharedLink = dto.Slug;
                blog.Tags = (dto.Keywords != null && dto.Keywords.Count > 0)
                                    ? string.Join(',', dto.Keywords) : null;
                blog.Summary = dto.Summary;
                blog.HtmlContent = dto.HtmlContent;
                // If CreatedAt is truly creation timestamp, maybe don't overwrite.
                // Consider separate PublishedAt or UpdatedAt:
                // blog.PublishedAt = dto.PublishedDate; // if you have it
                blog.UpdatedAt = now; // add column if not there yet
                blog.Type = dto.Type;
                blog.Status = "Draft"; // or preserve existing?
                toUpdate.Add(blog);
            }
        }

        if (toCreate.Count > 0)
            await _db.Blogs.AddRangeAsync(toCreate, ct);

        // For updates, tracked entities already in ChangeTracker are enough.
        await _db.SaveChangesAsync(ct);

        // Return all affected blogs in request order
        var result = new List<Blog>();
        foreach (var dto in dtos)
        {
            if (dto.Id is null)
                result.Add(toCreate.First(b => b.Title == dto.Title && b.SharedLink == dto.Slug)); // naive; better to track mapping
            else
                result.Add(existingById[dto.Id.Value]);
        }

        return result;
    }



    public async Task<Blog> UpdateAsync(int id, BlogCreateDto updated)
    {
        var blog = await _db.Blogs.FirstAsync(b => b.Id == id);
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
