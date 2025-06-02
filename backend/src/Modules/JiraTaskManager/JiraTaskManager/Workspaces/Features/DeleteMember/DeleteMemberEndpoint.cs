
namespace JiraTaskManager.Workspaces.Features.DeleteMember;

public class DeleteMemberEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapDelete("/jira/workspaces/{workspaceId}/members/{userId}",
    async (Guid workspaceId, string userId, ISender sender) =>
    {
      var result = await sender.Send(new DeleteMemberCommand(workspaceId, userId));
      return result;
    }).RequireAuthorization();
  }
}
