using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

public interface IBlogService
{
    Task<IEnumerable<Blog>> GetAllAsync();
    Task<Blog>             GetByIdAsync(long id);
    Task<Blog>             UpdateAsync(long id, Blog updated);
}

public class BlogService : IBlogService
{
    private readonly SupabaseDbContext _db;
    public BlogService(SupabaseDbContext db) => _db = db;

    public async Task<IEnumerable<Blog>> GetAllAsync() =>  await _db.QuizloBlogs.OrderByDescending(b => b.CreatedAt).ToListAsync();

    public async Task<Blog> GetByIdAsync(long id) =>  await _db.QuizloBlogs.FindAsync(id);

    public async Task<Blog> UpdateAsync(long id, Blog updated)
    {
        var blog = await _db.QuizloBlogs.FindAsync(id);
        if (blog == null) return null;

        // copy updatable fields
        blog.HtmlContent          = updated.HtmlContent;
        blog.Reviews              = updated.Reviews;
        blog.Type                 = updated.Type;
        blog.Title                = updated.Title;
        blog.Tags                 = updated.Tags;
        blog.SharedLink           = updated.SharedLink;
        blog.Summary              = updated.Summary;
        blog.Author               = updated.Author;
        blog.Status               = updated.Status;
        blog.ImageUrl             = updated.ImageUrl;
        blog.SocialMediaLinks     = updated.SocialMediaLinks;

        await _db.SaveChangesAsync();
        return blog;
    }
}
