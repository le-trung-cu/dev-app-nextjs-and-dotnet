using System;

namespace Tenants.Tenants.Features.CreateTenant;

public class CreateTenantEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/eshop/tenants", async (CreateTenantCommand request, ISender sender) =>
    {
      var result = await sender.Send(request);
      return result;
    })
    .RequireAuthorization();
  }
}
