using AdminDashboard.Api.DTOs;
using AdminDashboard.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AdminDashboard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController(IDashboardService dashboardService) : ControllerBase
{
    [HttpGet("stats")]
    public ActionResult<DashboardStatsDto> GetStats()
    {
        return Ok(dashboardService.GetStats());
    }
}
