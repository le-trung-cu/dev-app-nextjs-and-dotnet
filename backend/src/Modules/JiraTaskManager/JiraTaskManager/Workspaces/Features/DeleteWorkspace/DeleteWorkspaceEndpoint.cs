using System;

namespace JiraTaskManager.Workspaces.Features.DeleteWorkspace;

public class DeleteWorkspaceEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapDelete("/api/jira/workspaces/{workspaceId}",
    (Guid workspaceId, ISender sender) =>
    {
      var result = sender.Send(new DeleteWorkspaceCommand(workspaceId));
      return result;
    }).RequireAuthorization();
  }
}
