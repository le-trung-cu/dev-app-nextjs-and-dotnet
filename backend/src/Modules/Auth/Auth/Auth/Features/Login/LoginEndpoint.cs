namespace Auth.Auth.Features.Login;

public record LoginRequest(string? Email, string? Password);

public record LoginResponse(bool IsSuccess, string Token, UserDto User);

public class LoginEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/auth/login", async (LoginRequest request, ISender sender) => {
      var result = await sender.Send(request.Adapt<LoginCommand>());
      return Results.Ok(result.Adapt<LoginResponse>());
    });
  }
}
