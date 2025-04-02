
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace JiraTaskManager.Workspaces.Features.CreateTask;

public record CreateTaskRequest
{
  public Guid WorkspaceId { get; set; }
  public Guid? ProjectId { get; set; }
  public string? AssigneeId { get; set; }
  public string Name { get; set; } = default!;

  [JsonConverter(typeof(JsonStringEnumConverter))]
  public TaskItemStatus Status { get; set; }
  public DateTime? EndDate { get; set; }
}

public class CreateTaskEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/jira/workspaces/{workspaceId}/tasks", async (Guid workspaceId, CreateTaskRequest request, ISender sender) =>
    {
      var command = request.Adapt<CreateTaskCommand>() with { WorkspaceId = workspaceId };

      var result = await sender.Send(command);
      return result;
    })
    .RequireAuthorization();
  }
}
