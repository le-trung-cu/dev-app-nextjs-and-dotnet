namespace Auth.Auth.Features.Login;

public record LoginRequest(string? Email, string? Password, string? DeviceId);

public record LoginResponse(bool IsSuccess, string Token, string RefreshToken, DateTime? Expires, UserDto User);

public class LoginEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/auth/login", async (LoginRequest request, ISender sender) =>
    {
      var result = await sender.Send(request.Adapt<LoginCommand>());
      return Results.Ok(result.Adapt<LoginResponse>());
    });
  }
}
