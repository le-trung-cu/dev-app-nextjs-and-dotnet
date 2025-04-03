namespace JiraTaskManager.Workspaces.Features.JoinWorkspace;

public class JoinWorkspaceEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/jira/workspaces/{workspaceId}/join-members/{inviteToken}", async (
      Guid workspaceId,
      string inviteToken,
      ISender sender) =>
    {
      var result = await sender.Send(new JoinWorkspaceCommand(workspaceId, inviteToken));
      return result;
    }).RequireAuthorization();
  }
}
