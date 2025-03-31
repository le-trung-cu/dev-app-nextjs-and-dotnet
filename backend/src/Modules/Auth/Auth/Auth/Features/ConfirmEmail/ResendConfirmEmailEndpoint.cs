
namespace Auth.Auth.Features.ConfirmEmail;


public class ResendConfirmEmailEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/auth/resend-confirm-email", async (ISender sender) => {
      var result = await sender.Send(new ResendConfirmEmailCommand());
      return result;
    }).RequireAuthorization();
  }
}
