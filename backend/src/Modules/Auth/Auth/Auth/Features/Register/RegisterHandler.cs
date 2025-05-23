
using System.Text;
using Auth.Auth.Features.ConfirmEmail;
using Microsoft.AspNetCore.WebUtilities;

namespace Auth.Auth.Features.Register;

public record RegisterCommand
  (string Name, string Email, string Password, string? DeviceId)
  : ICommand<RegisterResult>;

public record RegisterResult(bool IsSuccess, string? Token = null, string? RefreshToken = null, DateTime? Expires = null, UserDto? User = null);

public class RegisterHandler
  (UserManager<User> userManager, JwtService jwtService, ISender sender)
  : ICommandHandler<RegisterCommand, RegisterResult>
{
  public async Task<RegisterResult> Handle(RegisterCommand command, CancellationToken cancellationToken)
  {
    var user = command.Adapt<User>();
    user.UserName = command.Email;
    var identityResult = await userManager.CreateAsync(user, command.Password);
    if (!identityResult.Succeeded)
    {
      var messages = identityResult.Errors.Select(x => x.Description);
      throw new BadHttpRequestException(string.Join("\n", messages), 400);
    }

    await sender.Send(new SendConfirmEmailCommand(user, command.Email), cancellationToken);

    var roles = await userManager.GetRolesAsync(user);
    var claims = jwtService.GetClaims(user, roles);
    var (token, expires) = jwtService.CreateToken(claims);
    var userDto = user.Adapt<UserDto>() with { Roles = roles };

    var refreshToken = jwtService.GenerateRefreshToken();
    var provider = string.IsNullOrWhiteSpace(command.DeviceId) ? "COMMON" : command.DeviceId;
    await userManager.SetAuthenticationTokenAsync(user, provider, "REFRESH_TOKEN", refreshToken);

    return new RegisterResult(true, token, refreshToken, expires, userDto);
  }
}
