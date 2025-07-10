using Postgrest.Attributes;
using Postgrest.Models;
using System.Text.Json;

[Table("quizlo_blogs")]
public class Blog : BaseModel
{
    [PrimaryKey("id")]
    public long Id { get; set; }

    [Column("createdAt")]
    public DateTime CreatedAt { get; set; }

    [Column("htmlContent")]
    public string HtmlContent { get; set; }

    [Column("reviews")]
    public JsonDocument? Reviews { get; set; }

    [Column("type")]
    public string Type { get; set; }

    [Column("title")]
    public string Title { get; set; }

    [Column("tags")]
    public string Tags { get; set; }

    [Column("sharedLink")]
    public string? SharedLink { get; set; }

    [Column("summary")]
    public string Summary { get; set; }

    [Column("author")]
    public string? Author { get; set; }

    [Column("status")]
    public string Status { get; set; }

    [Column("imageUrl")]
    public string? ImageUrl { get; set; }

    [Column("isFeatured")]
    public bool IsFeatured { get; set; } = false;

    [Column("socialMediaLinks")]
    public JsonDocument? SocialMediaLinks { get; set; }
}
