using System.Text;
using Microsoft.AspNetCore.WebUtilities;

namespace Auth.Auth.Features.ConfirmEmail;

public record SendConfirmEmailCommand(User User, string Email) : ICommand;


public class SendConfirmEmailHandler
  (UserManager<User> userManager, IEmailSender<User> emailSender, IConfiguration configuration)
  : ICommandHandler<SendConfirmEmailCommand>
{
  public async Task<Unit> Handle(SendConfirmEmailCommand command, CancellationToken cancellationToken)
  {
    var code = await userManager.GenerateEmailConfirmationTokenAsync(command.User);
    code = Uri.EscapeDataString(code);
    var confirmationLink = $"{configuration["ClientAppUrl"]}/confirm-email?userId={command.User.Id}&code={code}";
    await emailSender.SendConfirmationLinkAsync(command.User, command.Email, confirmationLink);

    return Unit.Value;
  }
}
