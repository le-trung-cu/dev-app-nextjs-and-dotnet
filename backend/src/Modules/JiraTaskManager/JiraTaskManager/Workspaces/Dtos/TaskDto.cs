using System.Text.Json.Serialization;

namespace JiraTaskManager.Workspaces.Dtos;

public record TaskDto
{
  public TaskDto(Guid workspaceId, Guid? projectId, string? assigneeId, string name, TaskItemStatus status, DateTime? endDate)
  {
    WorkspaceId = workspaceId;
    ProjectId = projectId;
    AssigneeId = assigneeId;
    Name = name;
    Status = status;
    EndDate = endDate;
  }

  public Guid WorkspaceId { get; set; }
  public Guid? ProjectId { get; set; }
  public string? AssigneeId { get; set; }
  public string Name { get; set; } = default!;
  public TaskItemStatus Status { get; set; }
  public DateTime? EndDate { get; set; }
}