
namespace Auth.Auth.Features.GetInfo;

public class GetInfoEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/auth/info", async (ISender sender) => {
      var result = await sender.Send(new GetInfoCommand());
      return result;
    }).RequireAuthorization();
  }
}
