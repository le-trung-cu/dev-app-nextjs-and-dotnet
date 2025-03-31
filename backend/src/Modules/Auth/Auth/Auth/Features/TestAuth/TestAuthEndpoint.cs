namespace Auth.Auth.Features.TestAuth;

public class TestAuthEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/auth/test-public", () => {
      return "test-public";
    });
     app.MapGet("/api/auth/test-private", () => {
      return "test-private";
    })
    .RequireAuthorization();
  }
}