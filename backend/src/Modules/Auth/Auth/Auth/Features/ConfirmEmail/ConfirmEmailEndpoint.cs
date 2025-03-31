namespace Auth.Auth.Features.ConfirmEmail;

public record ConfrimEmailRequest(string UserId, string Code);

public class ConfrimEmailEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/auth/confirm-email", async(ConfrimEmailRequest request, ISender sender) => {
      var result = await sender.Send(request.Adapt<ConfirmEmailCommand>());
      return result;
    });
  }
}
