using Microsoft.AspNetCore.Mvc;
using Quizlo.Questionnaire.WebApi.DTO;

[ApiController]
[Route("api/[controller]")]
public class BlogsController : ControllerBase
{
    private readonly IBlogService _svc;
    public BlogsController(IBlogService svc) => _svc = svc;

    // GET /api/blogs
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var dtos = await _svc.GetAllAsync();
        return Ok(dtos);
    }

    [HttpGet("by-status/{status}")]
    public async Task<IActionResult> Get(string status)
    {
        var dtos = await _svc.GetAllAsync();
        return Ok(dtos);
    }

    // GET /api/blogs/{id}
    [HttpGet("{id:long}")]
    public async Task<IActionResult> GetBlogById(long id)
    {
        var dto = await _svc.GetByIdAsync(id);
        if (dto == null) return NotFound();
        return Ok(dto);
    }

    [HttpGet("details/{name}")]
    public async Task<IActionResult> GetBlogDetails(string name)
    {
        var dto = await _svc.GetByLinkAsync(name);
        if (dto == null) return NotFound();
        return Ok(dto);
    }

    [HttpPost]
    public async Task<ActionResult<Blog>> CreateBlog([FromBody] BlogCreateDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _svc.CreateAsync(dto);
        return CreatedAtAction(nameof(GetBlogById), new { id = created.Id }, created);
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
