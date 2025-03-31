namespace Auth.Auth.Features.ResetPassword;

public class ResetPasswordEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/auth/reset-password", async (ResetPasswordCommand request, ISender sender) => {
      var result = await sender.Send(request);
      return result;
    });
  }
}
