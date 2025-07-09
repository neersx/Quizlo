
using System.Text.Json;

public class Blog
{
    public long     Id                  { get; set; }
    public DateTime CreatedAt           { get; set; }
    public string   HtmlContent         { get; set; }
    public JsonDocument? Reviews         { get; set; }
    public string   Type                { get; set; }
    public string   Title               { get; set; }
    public string   Tags                { get; set; }
    public string?   SharedLink          { get; set; }
    public string   Summary             { get; set; }
    public string?   Author              { get; set; }
    public string   Status              { get; set; }
    public string?   ImageUrl            { get; set; }
    public JsonDocument? SocialMediaLinks{ get; set; }
}
