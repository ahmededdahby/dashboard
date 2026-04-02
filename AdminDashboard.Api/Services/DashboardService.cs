using AdminDashboard.Api.Data;
using AdminDashboard.Api.DTOs;
using AdminDashboard.Api.Services.Interfaces;

namespace AdminDashboard.Api.Services;

public class DashboardService(AppDataContext dataContext) : IDashboardService
{
    public DashboardStatsDto GetStats()
    {
        var now = DateTime.UtcNow;
        var currentMonthStart = new DateTime(now.Year, now.Month, 1);
        var previousMonthStart = currentMonthStart.AddMonths(-1);

        var currentMonthOrders = dataContext.Orders.Where(order => order.CreatedAt >= currentMonthStart).ToList();
        var previousMonthOrders = dataContext.Orders
            .Where(order => order.CreatedAt >= previousMonthStart && order.CreatedAt < currentMonthStart)
            .ToList();

        var currentRevenue = currentMonthOrders.Sum(order => order.Total);
        var previousRevenue = previousMonthOrders.Sum(order => order.Total);

        return new DashboardStatsDto
        {
            TotalRevenue = dataContext.Orders.Sum(order => order.Total),
            TotalOrders = dataContext.Orders.Count,
            TotalUsers = dataContext.Users.Count,
            TotalProducts = dataContext.Products.Count,
            PendingOrders = dataContext.Orders.Count(order => order.Status is "Pending" or "Processing"),
            RevenueChange = CalculateChange(currentRevenue, previousRevenue),
            OrdersChange = CalculateChange(currentMonthOrders.Count, previousMonthOrders.Count),
            Trend = GetTrend(now)
        };
    }

    private List<TrendPointDto> GetTrend(DateTime now)
    {
        return Enumerable.Range(5, 6)
            .Select(offset =>
            {
                var month = new DateTime(now.Year, now.Month, 1).AddMonths(-offset);
                var nextMonth = month.AddMonths(1);
                var orders = dataContext.Orders
                    .Where(order => order.CreatedAt >= month && order.CreatedAt < nextMonth)
                    .ToList();

                return new TrendPointDto
                {
                    Label = month.ToString("MMM"),
                    Revenue = orders.Sum(order => order.Total),
                    Orders = orders.Count
                };
            })
            .ToList();
    }

    private static decimal CalculateChange(decimal current, decimal previous)
    {
        if (previous == 0)
        {
            return current == 0 ? 0 : 100;
        }

        return Math.Round(((current - previous) / previous) * 100, 1);
    }
}
