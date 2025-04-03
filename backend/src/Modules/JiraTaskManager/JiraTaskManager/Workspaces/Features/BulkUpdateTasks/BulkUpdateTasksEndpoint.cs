
namespace JiraTaskManager.Workspaces.Features.BulkUpdateTasks;

public record BulkUpdateTasksRequest(IEnumerable<BulkUpdateTaskItemDto> Tasks);
public class BulkUpdateTasksEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/jira/workspaces/{workspaceId}/tasks/bulk-update", 
    async (Guid workspaceId, BulkUpdateTasksRequest request, ISender sender) => {
      var command = new BulkUpdateTasksCommand(workspaceId, request.Tasks);
      var result = await sender.Send(command);
      return result;
    }).RequireAuthorization();
  }
}
