namespace JiraTaskManager.Workspaces.Dtos;

public record TaskDto
{
  public TaskDto(Guid id, Guid workspaceId, Guid? projectId, string? assigneeId, string name, TaskItemStatus status, DateTime? endDate, int position)
  {
    Id = id;
    WorkspaceId = workspaceId;
    ProjectId = projectId;
    AssigneeId = assigneeId;
    Name = name;
    Status = status;
    EndDate = endDate;
    Position = position;
  }

  public Guid Id { get; set; }
  public Guid WorkspaceId { get; set; }
  public Guid? ProjectId { get; set; }
  public string? AssigneeId { get; set; }
  public string Name { get; set; } = default!;
  public TaskItemStatus Status { get; set; }
  public DateTime? EndDate { get; set; }
  public int Position { get; set; }
}