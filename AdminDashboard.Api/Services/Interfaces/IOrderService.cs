using AdminDashboard.Api.DTOs;

namespace AdminDashboard.Api.Services.Interfaces;

public interface IOrderService
{
    List<OrderDto> GetAll(string? search, string? status);
    OrderDto? GetById(Guid id);
}
