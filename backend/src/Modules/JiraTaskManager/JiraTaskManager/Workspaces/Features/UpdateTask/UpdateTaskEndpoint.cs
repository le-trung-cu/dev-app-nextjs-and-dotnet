using System;
using System.Text.Json.Serialization;

namespace JiraTaskManager.Workspaces.Features.UpdateTask;


public record UpdateTaskRequest
{
  public Guid? ProjectId { get; set; }
  public string? AssigneeId { get; set; }
  public string Name { get; set; } = default!;

  [JsonConverter(typeof(JsonStringEnumConverter))]
  public TaskItemStatus Status { get; set; }
  public DateTime? EndDate { get; set; }
  public string? Description { get; set; }
}

public class UpdateTaskEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPut("/jira/workspaces/{workspaceId}/tasks/{taskId}",
    async (Guid workspaceId, Guid taskId, UpdateTaskRequest  request, ISender sender) =>
    {
      var command = request.Adapt<UpdateTaskCommand>() with { WorkspaceId = workspaceId, Id = taskId };
      var result = await sender.Send(command);
      return result;
    }).RequireAuthorization();
  }
}
