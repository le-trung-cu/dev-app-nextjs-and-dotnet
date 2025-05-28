
namespace Docs.Organizations.Features.SwichesOrganization;

public class SwichesOrganizationEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPut("/api/docs/organization/swiches-organization", async (SwichesOrganizationCommand request, ISender sender) =>
    {
      var result = await sender.Send(request);
      return result;
    }).RequireAuthorization();
  }
}
