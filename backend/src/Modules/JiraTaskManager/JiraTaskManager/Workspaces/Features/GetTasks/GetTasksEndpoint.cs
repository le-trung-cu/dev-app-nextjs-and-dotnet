namespace JiraTaskManager.Workspaces.Features.GetTasks;

public record GetTasksRequest
{
  public Guid? ProjectId { get; set; }
  public Guid? AssigneeId { get; set; }
  public TaskItemStatus? Status { get; set; }
  public DateTime? EndDate { get; set; }
}

public class GetTasksEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/jira/workspaces/{worksapceId}/tasks",
     async (Guid worksapceId, [AsParameters] GetTasksRequest request, ISender sender) => {
      var command = request.Adapt<GetTasksQuery>() with {WorkspaceId = worksapceId};
      var result = await sender.Send(command);
      
      return result;
    }).RequireAuthorization();
  }
}
