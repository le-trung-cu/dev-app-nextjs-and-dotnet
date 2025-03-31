namespace Auth.Auth.Features.ChangePassword;

public class ChangePasswordEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/auth/change-password", async (ChangePasswordCommand request, ISender sender) => {
      var result = await sender.Send(request);
      return result;
    });
  }
}
