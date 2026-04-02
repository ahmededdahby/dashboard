using AdminDashboard.Api.DTOs;
using AdminDashboard.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AdminDashboard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController(IOrderService orderService) : ControllerBase
{
    [HttpGet]
    public ActionResult<List<OrderDto>> GetAll([FromQuery] string? search, [FromQuery] string? status)
    {
        return Ok(orderService.GetAll(search, status));
    }

    [HttpGet("{id:guid}")]
    public ActionResult<OrderDto> GetById(Guid id)
    {
        var order = orderService.GetById(id);
        return order is null ? NotFound() : Ok(order);
    }
}
