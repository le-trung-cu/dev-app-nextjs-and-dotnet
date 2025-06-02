using System;

namespace JiraTaskManager.Workspaces.Features.DeleteTask;

public class DeleteTaskEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapDelete("/jira/workspaces/{workspaceId}/tasks/{taskId}",
    async (Guid workspaceId, Guid taskId, ISender sender) =>
    {
      var result = await sender.Send(new DeleteTaskCommand(workspaceId, taskId));
      return result;
    }).RequireAuthorization();
  }
}
