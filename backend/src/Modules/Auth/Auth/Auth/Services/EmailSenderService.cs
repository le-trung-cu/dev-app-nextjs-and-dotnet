using Resend;

namespace Auth.Auth.Services;

public class EmailSenderService(IResend resend) : IEmailSender<User>
{
  public async Task SendConfirmationLinkAsync(User user, string email, string confirmationLink)
  {
    // Please confirm your account by <a href='https://contoso.com/confirmEmail?userId={user ID}&code={generated code}&changedEmail={new email address}'>clicking here</a>.
    var subject = "Confirm your email address";
    var body = $@"
      <p>Hi {user.Name}</p>
      <p>
        Please confirm your account by <a href='{confirmationLink}'>clicking here</a>.
      </p>
      <p>Thanks</p>
    ";

    // await SendMailAsync(email, subject, body);
    await Task.CompletedTask;

  }

  public async Task SendPasswordResetCodeAsync(User user, string email, string resetCode)
  {
    var subject = "Reset your password";
    var body = $@"
      <p>Hi {user.Name}</p>
      <p>
        Please use this code to reset your  password: <span>{resetCode}</span>
      </p>
      <p>Thanks</p>
    ";

    // await SendMailAsync(email, subject, body);
    await Task.CompletedTask;

  }

  public async Task SendPasswordResetLinkAsync(User user, string email, string resetLink)
  {
    var subject = "Reset your password";
    var body = $@"
      <p>Hi {user.Name}</p>
      <p>
        Please reset your account by <a href='{resetLink}'>clicking here</a>.
      </p>
      <p>Thanks</p>
    ";

    // await SendMailAsync(email, subject, body);
    await Task.CompletedTask;

  }

  private async Task SendMailAsync(string email, string subject, string body)
  {
    var  message = new EmailMessage
    {
      From = "devapp@resend.dev",
      Subject =  subject,
      HtmlBody = body
    };

    message.To.Add(email);

    Console.WriteLine(message.HtmlBody);

    // await resend.EmailSendAsync(message);
    await Task.CompletedTask;
  }
}
