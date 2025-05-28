using System;

namespace Docs.Organizations.Features.GetOrganizations;

public class GetOrganizationsEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/docs/organizations", async (ISender sender) =>
    {
      var result = await sender.Send(new GetOrganizationsQuery());
      return result;
    }).RequireAuthorization();
  }
}
