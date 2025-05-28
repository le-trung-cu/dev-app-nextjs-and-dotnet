using Shared.Extensions;

namespace Auth.Auth.Features.Login;

public record LoginCommand(string Email, string Password, string? DeviceId)
  : ICommand<LoginResult>;

public record LoginResult(bool IsSuccess, string Token, string RefreshToken, DateTime Expires, UserDto User);

internal class LoginHandler
  (UserManager<User> userManager, JwtService jwtService)
  : ICommandHandler<LoginCommand, LoginResult>
{
  public async Task<LoginResult> Handle(LoginCommand command, CancellationToken cancellationToken)
  {
    var user = await userManager.FindByEmailAsync(command.Email)
      ?? throw new Exception("Email is wrong");

    if(!await userManager.CheckPasswordAsync(user, command.Password))
    {
      throw new Exception("Password is wrong");
    }
    var roles = await userManager.GetRolesAsync(user);
    var claims = jwtService.GetClaims(user, roles);
    var (token, expires) = jwtService.CreateToken(claims);

    var refreshToken = jwtService.GenerateRefreshToken();
    var provider = string.IsNullOrWhiteSpace(command.DeviceId) ? "COMMON" : command.DeviceId;
    await userManager.SetAuthenticationTokenAsync(user, provider, "REFRESH_TOKEN", refreshToken);
    
    var userDto = user.Adapt<UserDto>() with {Roles=roles};
    
    return new LoginResult(true, token, refreshToken, expires, userDto);
  }
}