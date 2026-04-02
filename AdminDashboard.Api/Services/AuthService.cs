using AdminDashboard.Api.Data;
using AdminDashboard.Api.DTOs;
using AdminDashboard.Api.Services.Interfaces;

namespace AdminDashboard.Api.Services;

public class AuthService(AppDataContext dataContext) : IAuthService
{
    public LoginResponseDto? Login(LoginRequestDto request)
    {
        const string demoPassword = "Admin123!";

        if (!string.Equals(request.Password, demoPassword, StringComparison.Ordinal))
        {
            return null;
        }

        var user = dataContext.Users.FirstOrDefault(user =>
            string.Equals(user.Email, request.Email, StringComparison.OrdinalIgnoreCase))
            ?? dataContext.Users.FirstOrDefault(user =>
                string.Equals(user.Role, "Admin", StringComparison.OrdinalIgnoreCase));

        if (user is null)
        {
            return null;
        }

        return new LoginResponseDto
        {
            // A fake token is enough for this demo because the focus is app flow, not auth infrastructure.
            Token = $"demo-token-{user.Id:N}",
            User = new AuthUserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role
            }
        };
    }
}
