using AdminDashboard.Api.DTOs;

namespace AdminDashboard.Api.Services.Interfaces;

public interface IUserService
{
    List<UserDto> GetAll(string? search, string? role, string? status);
    UserDto? GetById(Guid id);
    UserDto Create(UpsertUserDto request);
    UserDto? Update(Guid id, UpsertUserDto request);
}
