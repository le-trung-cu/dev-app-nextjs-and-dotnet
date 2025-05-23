using System;

namespace Tenants.Tenants.Features.CreateTenant;

public record CreateTenantRequest(string Name, string Slug, Guid? ImageId);

public class CreateTenantEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/eshop/tenants", async (CreateTenantRequest request, ISender sender) =>
    {
      var result = await sender.Send(request.Adapt<CreateTenantCommand>());
      return result;
    })
    .RequireAuthorization();
  }
}
