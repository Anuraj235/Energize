using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Energize.Api.Controllers;

public record SessionDto(int Id, string Title, string Level, DateTime StartsAt);

[ApiController]
[Route("api/[controller]")]
public class SessionsController : ControllerBase
{
    private static readonly List<SessionDto> Seed = new()
    {
        new(1, "Kickoff & Roadmap", "Beginner", DateTime.UtcNow.AddDays(3)),
        new(2, "Data & Algorithms Primer", "Intermediate", DateTime.UtcNow.AddDays(7)),
        new(3, "Projects & Demos", "Advanced", DateTime.UtcNow.AddDays(14))
    };

    [HttpGet]
    public IActionResult GetAll() => Ok(Seed);

    [HttpGet("{id:int}")]
    public IActionResult Get(int id) =>
        Seed.FirstOrDefault(s => s.Id == id) is { } found ? Ok(found) : NotFound();

    [HttpPost]
    public IActionResult Create([FromBody] SessionDto dto)
    {
        var nextId = Seed.Count == 0 ? 1 : Seed.Max(s => s.Id) + 1;
        var created = dto with { Id = nextId };
        Seed.Add(created);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }
}
