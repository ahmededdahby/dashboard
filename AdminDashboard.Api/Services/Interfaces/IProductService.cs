using AdminDashboard.Api.DTOs;

namespace AdminDashboard.Api.Services.Interfaces;

public interface IProductService
{
    List<ProductDto> GetAll(string? search, string? category, string? status);
    ProductDto? GetById(Guid id);
    ProductDto Create(UpsertProductDto request);
    ProductDto? Update(Guid id, UpsertProductDto request);
}
