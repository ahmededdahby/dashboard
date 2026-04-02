using AdminDashboard.Api.DTOs;
using AdminDashboard.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AdminDashboard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("login")]
    public ActionResult<LoginResponseDto> Login([FromBody] LoginRequestDto request)
    {
        var result = authService.Login(request);

        if (result is null)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        return Ok(result);
    }
}
