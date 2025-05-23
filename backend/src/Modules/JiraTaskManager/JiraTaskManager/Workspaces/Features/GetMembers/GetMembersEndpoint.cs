
namespace JiraTaskManager.Workspaces.Features.GetMembers;

public class GetMembersEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/jira/workspaces/{workspaceId}/members",
    async (Guid workspaceId, ISender sender) => {
      var result = await sender.Send(new GetMembersQuery(workspaceId));
      return result;
    })
    .RequireAuthorization();
  }
}
