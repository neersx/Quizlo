using Microsoft.AspNetCore.Authorization;
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
        var dtos = await _svc.GetAllAsync(status);
        return Ok(dtos);
    }

    // GET /api/blogs/{id}
    [HttpGet("{id:long}")]
    public async Task<IActionResult> GetBlogById(int id)
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
    [Authorize]
    public async Task<ActionResult<Blog>> CreateBlog([FromBody] BlogCreateDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _svc.CreateAsync(dto);
        return CreatedAtAction(nameof(GetBlogById), new { id = created.Id }, created);
    }

    [HttpPost("draft")]
    [Authorize]
    public async Task<IActionResult> CreateDraft([FromBody] CreateDraftBlogDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // assume you pull the user ID from your auth context
        int userId = int.Parse(User.FindFirst("sub").Value);

        var blog = await _svc.CreateDraftAsync(dto, userId);

        // return 201 with location header
        return CreatedAtAction(nameof(GetBlogById), new { id = blog.Id }, blog);
    }

    // PUT /api/blogs/123
    [HttpPut("{id:long}")]
    [Authorize]
    public async Task<IActionResult> UpdateBlog(int id, [FromBody] BlogCreateDto updated)
    {
        if (id != updated.Id)
            return BadRequest("ID in URL must match ID in payload");

        var blog = await _svc.UpdateAsync(id, updated);
        if (blog == null) return NotFound();
        return Ok(blog);
    }
}
