using Shared.Exceptions;

namespace Auth.Auth.Features.GetInfo;

public record GetInfoCommand() : ICommand<GetInfoResult>;

public record GetInfoResult(UserDto User);

public class GetInfoHandler
  (UserManager<User> userManager, IHttpContextAccessor contextAccessor) : ICommandHandler<GetInfoCommand, GetInfoResult>
{
  public async Task<GetInfoResult> Handle(GetInfoCommand request, CancellationToken cancellationToken)
  {
    var claims = contextAccessor.HttpContext!.User;
    var user = await userManager.GetUserAsync(claims)
      ?? throw new BadRequestException("Unauthenticate");

    return new GetInfoResult(user.Adapt<UserDto>());
  }
}
