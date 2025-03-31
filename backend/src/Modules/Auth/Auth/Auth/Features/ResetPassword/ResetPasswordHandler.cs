
using Shared.Exceptions;

namespace Auth.Auth.Features.ResetPassword;

public record ResetPasswordCommand(string Email, string Code, string NewPassword)
  : ICommand<ResetPasswordResult>;

public record ResetPasswordResult(bool IsSuccess);

public class ResetPasswordHandler
  (UserManager<User> userManager)
  : ICommandHandler<ResetPasswordCommand, ResetPasswordResult>
{
  public async Task<ResetPasswordResult> Handle(ResetPasswordCommand command, CancellationToken cancellationToken)
  {
    var user = await userManager.FindByEmailAsync(command.Email)
      ?? throw new BadRequestException("Not found email");

    await userManager.ResetPasswordAsync(user, command.Code, command.NewPassword);

    return new ResetPasswordResult(true);
  }
}
