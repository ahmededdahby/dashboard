using AdminDashboard.Api.DTOs;

namespace AdminDashboard.Api.Services.Interfaces;

public interface IDashboardService
{
    DashboardStatsDto GetStats();
}
