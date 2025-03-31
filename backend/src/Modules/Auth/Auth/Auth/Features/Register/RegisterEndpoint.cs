namespace Auth.Auth.Features.Register;

public record RegisterRequest(string? Name, string? Email, string? Password);

public record RegisterResponse(bool IsSuccess, string? Token, UserDto? User);

public class RegisterEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/auth/register", async (RegisterRequest request, ISender sender) =>
    {
      var result = await sender.Send(request.Adapt<RegisterCommand>());
      return Results.Ok(result.Adapt<RegisterResponse>());
    });
  }
}
