using AdminDashboard.Api.DTOs;

namespace AdminDashboard.Api.Services.Interfaces;

public interface IAuthService
{
    LoginResponseDto? Login(LoginRequestDto request);
}
