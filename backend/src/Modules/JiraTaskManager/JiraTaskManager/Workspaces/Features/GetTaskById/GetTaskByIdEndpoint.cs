
namespace JiraTaskManager.Workspaces.Features.GetTaskById;

public class GetTaskByIdEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/jira/workspaces/{workspaceId}/tasks/{taskId}",
    async (Guid workspaceId, Guid taskId, ISender sender) =>
    {
      var result = await sender.Send(new GetTaskByIdQuery(workspaceId, taskId));
      return result;
    }).RequireAuthorization();
  }
}
