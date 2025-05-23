namespace Auth.Auth.Features.RefreshToken;

public record RefreshTokenRequest(string AccessToken, string RefreshToken, string? DeviceId);

public class RefreshTokenEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/auth/refresh-token", async (RefreshTokenRequest request, ISender sender) => {
      var result = await sender.Send(request.Adapt<RefreshTokenCommand>());
      return result;
    });
  }
}
