using Shared.Exceptions;

namespace Auth.Auth.Features.ConfirmEmail;

public record ConfirmEmailCommand(string UserId, string Code) : ICommand<ConfirmEmailResult>;

public record ConfirmEmailResult(bool IsSuccess);

public class ConfirmEmailHandler
  (UserManager<User> userManager)
  : ICommandHandler<ConfirmEmailCommand, ConfirmEmailResult>
{
  public async Task<ConfirmEmailResult> Handle(ConfirmEmailCommand command, CancellationToken cancellationToken)
  {
    var user = await userManager.FindByIdAsync(command.UserId)
      ?? throw new BadRequestException("Not found the user");
    
    var result = await userManager.ConfirmEmailAsync(user, command.Code);
    

    return new ConfirmEmailResult(true);
  }
}
