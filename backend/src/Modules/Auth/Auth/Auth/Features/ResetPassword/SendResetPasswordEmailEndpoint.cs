
namespace Auth.Auth.Features.ResetPassword;

public class SendResetPasswordEmailEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/auth/send-reset-password-email",
    async (SendResetPasswordEmailCommand request, ISender sender) => {
      var result = await sender.Send(request);
      return result;
    });
  }
}
