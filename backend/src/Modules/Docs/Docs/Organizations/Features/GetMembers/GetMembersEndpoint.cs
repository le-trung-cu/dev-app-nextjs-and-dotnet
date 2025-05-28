
namespace Docs.Organizations.Features.GetMembers;

public class GetMembersEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/docs/organizations/{organizationId}/members",
    async (Guid organizationId, ISender sender) => {
      var result = await sender.Send(new GetMembersQuery(organizationId));
      return result;
    })
    .RequireAuthorization();
  }
}
