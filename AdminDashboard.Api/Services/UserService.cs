using AdminDashboard.Api.Data;
using AdminDashboard.Api.DTOs;
using AdminDashboard.Api.Models;
using AdminDashboard.Api.Services.Interfaces;

namespace AdminDashboard.Api.Services;

public class UserService(AppDataContext dataContext) : IUserService
{
    public List<UserDto> GetAll(string? search, string? role, string? status)
    {
        var query = dataContext.Users.AsEnumerable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(user =>
                user.FullName.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                user.Email.Contains(search, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(role))
        {
            query = query.Where(user => string.Equals(user.Role, role, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(user => string.Equals(user.Status, status, StringComparison.OrdinalIgnoreCase));
        }

        return query
            .OrderByDescending(user => user.CreatedAt)
            .Select(Map)
            .ToList();
    }

    public UserDto? GetById(Guid id)
    {
        var user = dataContext.Users.FirstOrDefault(item => item.Id == id);
        return user is null ? null : Map(user);
    }

    public UserDto Create(UpsertUserDto request)
    {
        var user = new User
        {
            Id = Guid.NewGuid(),
            FullName = request.FullName.Trim(),
            Email = request.Email.Trim(),
            Role = request.Role.Trim(),
            Status = request.Status.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        dataContext.Users.Add(user);
        return Map(user);
    }

    public UserDto? Update(Guid id, UpsertUserDto request)
    {
        var user = dataContext.Users.FirstOrDefault(item => item.Id == id);

        if (user is null)
        {
            return null;
        }

        user.FullName = request.FullName.Trim();
        user.Email = request.Email.Trim();
        user.Role = request.Role.Trim();
        user.Status = request.Status.Trim();

        return Map(user);
    }

    private static UserDto Map(User user) =>
        new()
        {
            Id = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role,
            Status = user.Status,
            CreatedAt = user.CreatedAt
        };
}
