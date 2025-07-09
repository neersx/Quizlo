using Microsoft.EntityFrameworkCore;

public class SupabaseDbContext : DbContext
{
    public SupabaseDbContext(DbContextOptions<SupabaseDbContext> options)
        : base(options) { }

    public DbSet<Blog> QuizloBlogs { get; set; }

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<Blog>(e =>
        {
            e.ToTable("quizlo_blogs");
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasColumnName("id");
            e.Property(x => x.CreatedAt).HasColumnName("createdAt");
            e.Property(x => x.HtmlContent).HasColumnName("htmlContent");
            e.Property(x => x.Reviews).HasColumnName("reviews");
            e.Property(x => x.Type).HasColumnName("type");
            e.Property(x => x.Title).HasColumnName("title");
            e.Property(x => x.Tags).HasColumnName("tags");
            e.Property(x => x.SharedLink).HasColumnName("sharedLink");
            e.Property(x => x.Summary).HasColumnName("summary");
            e.Property(x => x.Author).HasColumnName("author");
            e.Property(x => x.Status).HasColumnName("status");
            e.Property(x => x.ImageUrl).HasColumnName("imageUrl");
            e.Property(x => x.IsFeatured).HasColumnName("isFeatured");
            e.Property(x => x.SocialMediaLinks).HasColumnName("socialMediaLinks");
        });
    }
}
