
namespace Tenants.Tenants.Features.UpdateTenant;


public record UpdateTenantRequest(string Name, string Slug, Guid? ImageId);
public class UpdateTenantEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPut("/api/eshop/tenants/{tenantId}",
    (Guid tenantId, UpdateTenantRequest request, ISender sender) =>
    {
      var result = sender.Send(request.Adapt<UpdateTenantCommand>() with { Id = tenantId });
      return result;
    });
  }
}
