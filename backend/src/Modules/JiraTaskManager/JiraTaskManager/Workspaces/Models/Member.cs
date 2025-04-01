
namespace JiraTaskManager.Workspaces.Models;

public class Member : Entity<Guid>
{
  public Guid WorkspaceId { get; set; }
  public string UserId { get; set; } = default!;
  public MemberRole Role { get; set; }

  public ICollection<TaskItem> Tasks { get; set; } = [];

  internal Member(Guid workspaceId, string userId,  MemberRole role)
  {
    UserId = userId;
    WorkspaceId = workspaceId;
    Role = role;
  }
}
