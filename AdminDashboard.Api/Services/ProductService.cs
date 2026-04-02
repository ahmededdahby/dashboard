using AdminDashboard.Api.Data;
using AdminDashboard.Api.DTOs;
using AdminDashboard.Api.Models;
using AdminDashboard.Api.Services.Interfaces;

namespace AdminDashboard.Api.Services;

public class ProductService(AppDataContext dataContext) : IProductService
{
    public List<ProductDto> GetAll(string? search, string? category, string? status)
    {
        var query = dataContext.Products.AsEnumerable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(product =>
                product.Name.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                product.Category.Contains(search, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(category))
        {
            query = query.Where(product =>
                string.Equals(product.Category, category, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(product =>
                string.Equals(product.Status, status, StringComparison.OrdinalIgnoreCase));
        }

        return query
            .OrderByDescending(product => product.CreatedAt)
            .Select(Map)
            .ToList();
    }

    public ProductDto? GetById(Guid id)
    {
        var product = dataContext.Products.FirstOrDefault(item => item.Id == id);
        return product is null ? null : Map(product);
    }

    public ProductDto Create(UpsertProductDto request)
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = request.Name.Trim(),
            Category = request.Category.Trim(),
            Price = request.Price,
            Stock = request.Stock,
            Status = request.Status.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        dataContext.Products.Add(product);
        return Map(product);
    }

    public ProductDto? Update(Guid id, UpsertProductDto request)
    {
        var product = dataContext.Products.FirstOrDefault(item => item.Id == id);

        if (product is null)
        {
            return null;
        }

        product.Name = request.Name.Trim();
        product.Category = request.Category.Trim();
        product.Price = request.Price;
        product.Stock = request.Stock;
        product.Status = request.Status.Trim();

        return Map(product);
    }

    private static ProductDto Map(Product product) =>
        new()
        {
            Id = product.Id,
            Name = product.Name,
            Category = product.Category,
            Price = product.Price,
            Stock = product.Stock,
            Status = product.Status,
            CreatedAt = product.CreatedAt
        };
}
