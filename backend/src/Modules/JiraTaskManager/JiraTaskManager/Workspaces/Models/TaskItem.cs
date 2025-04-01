using JiraTaskManager.Workspaces.ValueObjects;
using Shared.DDD;

namespace JiraTaskManager.Workspaces.Models;

public class TaskItem : Entity<Guid>
{
  public string Name { get; private set; } = default!;
  public TaskItemStatus Status { get; private set; }
  public DateTime? EndDate { get; private set; }
  public string? Description { get; private set; }
  public Guid WorkspaceId { get; private set; }
  public Guid? ProjectId { get; private set; }
  public Project? Project { get; private set; }
  public Guid? AssigneeId { get; private set; }
  public Member? Assignee { get; private set; }


  internal TaskItem(Guid workspaceId, Guid? projectId, Guid? assigneeId, string name, TaskItemStatus status, DateTime? endDate, string? description)
  {
    WorkspaceId = workspaceId;
    ProjectId = projectId;
    AssigneeId = assigneeId;
    Name = name;
    Status = status;
    EndDate = endDate;
    Description = description;
  }

  public void Update(Guid? projectId, Guid? assigneeId, string name, TaskItemStatus status, DateTime? endDate, string? description)
  {
    ProjectId = projectId;
    AssigneeId = assigneeId;
    Name = name;
    Status = status;
    EndDate = endDate;
    Description = description;
  }
}
