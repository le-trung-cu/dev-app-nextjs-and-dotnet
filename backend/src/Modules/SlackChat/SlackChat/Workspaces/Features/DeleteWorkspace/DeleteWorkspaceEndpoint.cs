
namespace SlackChat.Workspaces.Features.DeleteWorkspace;

public class DeleteWorkspaceEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapDelete("/api/slack/workspaces/{workspaceId}",
     async (Guid workspaceId, ISender sender) =>
     {
       var result = await sender.Send(new DeleteWorkspaceCommand(workspaceId));
       return result;
     }).RequireAuthorization();
  }
}
