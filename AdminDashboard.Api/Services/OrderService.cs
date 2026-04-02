using AdminDashboard.Api.Data;
using AdminDashboard.Api.DTOs;
using AdminDashboard.Api.Services.Interfaces;

namespace AdminDashboard.Api.Services;

public class OrderService(AppDataContext dataContext) : IOrderService
{
    public List<OrderDto> GetAll(string? search, string? status)
    {
        var query = dataContext.Orders.AsEnumerable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(order =>
                order.CustomerName.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                order.CustomerEmail.Contains(search, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(order =>
                string.Equals(order.Status, status, StringComparison.OrdinalIgnoreCase));
        }

        return query
            .OrderByDescending(order => order.CreatedAt)
            .Select(Map)
            .ToList();
    }

    public OrderDto? GetById(Guid id)
    {
        var order = dataContext.Orders.FirstOrDefault(item => item.Id == id);
        return order is null ? null : Map(order);
    }

    private static OrderDto Map(Models.Order order) =>
        new()
        {
            Id = order.Id,
            CustomerName = order.CustomerName,
            CustomerEmail = order.CustomerEmail,
            Status = order.Status,
            CreatedAt = order.CreatedAt,
            Total = order.Total,
            Items = order.Items.Select(item => new OrderItemDto
            {
                ProductName = item.ProductName,
                Quantity = item.Quantity,
                UnitPrice = item.UnitPrice
            }).ToList()
        };
}
