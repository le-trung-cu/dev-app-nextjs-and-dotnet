namespace Tenants.Tenants.Features.GetTenants;

public class GetTenantsEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/eshop/tenants", async (ISender sender) =>
    {
      var result = await sender.Send(new GetTenantsQuery());
      return result;
    });
  }
}
