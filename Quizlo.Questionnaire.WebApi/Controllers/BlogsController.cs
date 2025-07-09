using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class BlogsController : ControllerBase
{
    private readonly IBlogService _svc;
    public BlogsController(IBlogService svc) => _svc = svc;

    // GET /api/blogs
    [HttpGet]
    public async Task<IActionResult> Get() =>
        Ok(await _svc.GetAllAsync());

    // GET /api/blogs/123
    [HttpGet("{id:long}")]
    public async Task<IActionResult> Get(long id)
    {
        var blog = await _svc.GetByIdAsync(id);
        if (blog == null) return NotFound();
        return Ok(blog);
    }

    // PUT /api/blogs/123
    [HttpPut("{id:long}")]
    public async Task<IActionResult> Put(long id, [FromBody] Blog updated)
    {
        if (id != updated.Id)
            return BadRequest("ID in URL must match ID in payload");

        var blog = await _svc.UpdateAsync(id, updated);
        if (blog == null) return NotFound();
        return Ok(blog);
    }
}
