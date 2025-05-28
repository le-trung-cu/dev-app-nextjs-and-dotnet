using Shared.Exceptions;

namespace Auth.Auth.Features.GetInfo;

public record GetInfoCommand() : ICommand<GetInfoResult>;

public record GetInfoResult(UserDto User, Dictionary<string, string> AppClaims);

public class GetInfoHandler
  (UserManager<User> userManager, IHttpContextAccessor contextAccessor) : ICommandHandler<GetInfoCommand, GetInfoResult>
{
  public async Task<GetInfoResult> Handle(GetInfoCommand request, CancellationToken cancellationToken)
  {
    var princepal = contextAccessor.HttpContext!.User;
    var user = await userManager.GetUserAsync(princepal)
      ?? throw new BadRequestException("Unauthenticate");

    var claims = princepal.Claims
      .Where(x => x.Type.StartsWith("app_")).ToDictionary(x => x.Type, x => x.Value);

    return new GetInfoResult(user.Adapt<UserDto>(), claims);
  }
}
