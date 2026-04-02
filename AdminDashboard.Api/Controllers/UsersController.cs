using AdminDashboard.Api.DTOs;
using AdminDashboard.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AdminDashboard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(IUserService userService) : ControllerBase
{
    [HttpGet]
    public ActionResult<List<UserDto>> GetAll([FromQuery] string? search, [FromQuery] string? role, [FromQuery] string? status)
    {
        return Ok(userService.GetAll(search, role, status));
    }

    [HttpGet("{id:guid}")]
    public ActionResult<UserDto> GetById(Guid id)
    {
        var user = userService.GetById(id);
        return user is null ? NotFound() : Ok(user);
    }

    [HttpPost]
    public ActionResult<UserDto> Create([FromBody] UpsertUserDto request)
    {
        var user = userService.Create(request);
        return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
    }

    [HttpPut("{id:guid}")]
    public ActionResult<UserDto> Update(Guid id, [FromBody] UpsertUserDto request)
    {
        var user = userService.Update(id, request);
        return user is null ? NotFound() : Ok(user);
    }
}
