
using Shared.Exceptions;

namespace Auth.Auth.Features.ChangePassword;

public record ChangePasswordCommand(string CurrentPassword, string NewPassword)
  : ICommand<ChangePasswordResult>;

public record ChangePasswordResult(bool IsSuccess);

public class ChangePasswordHandler
  (UserManager<User> userManager, IHttpContextAccessor contextAccessor)
  : ICommandHandler<ChangePasswordCommand, ChangePasswordResult>
{
  public async Task<ChangePasswordResult> Handle(ChangePasswordCommand command, CancellationToken cancellationToken)
  {
    var claimsPrincipal = contextAccessor.HttpContext?.User ?? throw new BadRequestException("Unauthrized");
    var user = await userManager.GetUserAsync(claimsPrincipal) ?? throw new BadRequestException("Unauthrized");

    var result = await userManager.ChangePasswordAsync(user, command.CurrentPassword, command.NewPassword);

    if (!result.Succeeded)
      throw new BadRequestException(result.Errors.First().Description);

    return new ChangePasswordResult(true);
  }
}
