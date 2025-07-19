using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Blog
{
    [Key]
    public int Id { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; }

    [Required]
    public int CreatedBy { get; set; } = 1;

    public DateTime? UpdatedAt { get; set; }

    [Required]
    public string HtmlContent { get; set; }

    public virtual ICollection<BlogReview> Reviews { get; set; } = new List<BlogReview>();
    public virtual ICollection<BlogRating> Ratings { get; set; } = new List<BlogRating>();
    public virtual ICollection<BlogLike> Likes { get; set; } = new List<BlogLike>();

    [Required, StringLength(20)]
    public string Type { get; set; } = "Post";

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

    [StringLength(50)]
    public string? Category { get; set; }

    [Required, StringLength(20)]
    public string Status { get; set; } = "Draft";

    [StringLength(500)]
    public string? ImageUrl { get; set; }

    public bool IsFeatured { get; set; } = false;
     public bool IsPostedOnSocialMedia { get; set; } = false;
}

public class BlogReview
{
    [Key]
    public int Id { get; set; }

    [Required, StringLength(500)]
    public string Message { get; set; }

    [Required]
    public string UserId { get; set; }

    [ForeignKey(nameof(Blog))]
    public int BlogId { get; set; }

    [Required]
    public DateTime ReviewedAt { get; set; }

    public virtual Blog Blog { get; set; }
}

public class BlogRating
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [ForeignKey(nameof(Blog))]
    public int BlogId { get; set; }

    [Required]
    public DateTime RatedAt { get; set; }

    [Range(1, 5)]
    public int Rating { get; set; }

    public virtual Blog Blog { get; set; }
}

public class BlogLike
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [ForeignKey(nameof(Blog))]
    public int BlogId { get; set; }

    [Required]
    public DateTime LikedAt { get; set; }

    public virtual Blog Blog { get; set; }
}
