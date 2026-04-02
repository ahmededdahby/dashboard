using AdminDashboard.Api.DTOs;
using AdminDashboard.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AdminDashboard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(IProductService productService) : ControllerBase
{
    [HttpGet]
    public ActionResult<List<ProductDto>> GetAll([FromQuery] string? search, [FromQuery] string? category, [FromQuery] string? status)
    {
        return Ok(productService.GetAll(search, category, status));
    }

    [HttpGet("{id:guid}")]
    public ActionResult<ProductDto> GetById(Guid id)
    {
        var product = productService.GetById(id);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpPost]
    public ActionResult<ProductDto> Create([FromBody] UpsertProductDto request)
    {
        var product = productService.Create(request);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id:guid}")]
    public ActionResult<ProductDto> Update(Guid id, [FromBody] UpsertProductDto request)
    {
        var product = productService.Update(id, request);
        return product is null ? NotFound() : Ok(product);
    }
}
