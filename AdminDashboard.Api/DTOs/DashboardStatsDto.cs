namespace AdminDashboard.Api.DTOs;

public class DashboardStatsDto
{
    public decimal TotalRevenue { get; set; }
    public int TotalOrders { get; set; }
    public int TotalUsers { get; set; }
    public int TotalProducts { get; set; }
    public int PendingOrders { get; set; }
    public decimal RevenueChange { get; set; }
    public decimal OrdersChange { get; set; }
    public List<TrendPointDto> Trend { get; set; } = [];
}
