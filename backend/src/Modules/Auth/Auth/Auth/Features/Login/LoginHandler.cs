namespace Auth.Auth.Features.Login;

public record LoginCommand(string Email, string Password)
  : ICommand<LoginResult>;

public record LoginResult(bool IsSuccess, string Token, UserDto User);

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
    var token = jwtService.CreateToken(claims);
    var userDto = user.Adapt<UserDto>() with {Roles=roles};
    return new LoginResult(true, token, userDto);
  }
}