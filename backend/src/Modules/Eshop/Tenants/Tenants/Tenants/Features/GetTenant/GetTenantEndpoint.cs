
namespace Tenants.Tenants.Features.GetTenant;

public class GetTenantEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/eshop/tenants/{tenantId}", async (string tenantId, ISender sender) =>
    {
      var result = await sender.Send(new GetTenantByIdQuery(tenantId));
      return result;
    });
  }
}
