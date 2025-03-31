
using Resend;
using Shared.Exceptions;

namespace Auth.Auth.Features.ResetPassword;

public record SendResetPasswordEmailCommand(string Email)
  : ICommand<SendResetPasswordEmailResult>;

public record SendResetPasswordEmailResult(bool IsSuccess);

public class SendResetPasswordEmailHandler
  (UserManager<User> userManager, IEmailSender<User> emailSender, IConfiguration configuration)
  : ICommandHandler<SendResetPasswordEmailCommand, SendResetPasswordEmailResult>
{
  public async Task<SendResetPasswordEmailResult> Handle(SendResetPasswordEmailCommand command, CancellationToken cancellationToken)
  {
    var user = await userManager.FindByEmailAsync(command.Email) ?? throw new BadRequestException("Not found the email");
    var resetCode = await userManager.GeneratePasswordResetTokenAsync(user);
    var resetLink = $"{configuration["ClientAppUrl"]}/reset-password?email={command.Email}&code={resetCode}";

    await emailSender.SendPasswordResetLinkAsync(user, command.Email, resetLink);
    
    return new SendResetPasswordEmailResult(true);
  }
}
