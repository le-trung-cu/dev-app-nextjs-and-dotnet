namespace JiraTaskManager.Workspaces.Dtos;

public class MemberDto
{
  public MemberDto(Guid workspaceId, string userId, MemberRole role, string name, string email)
  {
    WorkspaceId = workspaceId;
    UserId = userId;
    Role = role;
    Name = name;
    Email = email;
  }

  public Guid WorkspaceId { get; set; }
  public string UserId { get; set; } = default!;
  public MemberRole Role { get; set; }
  public string Name { get; set; } = default!;
  public string Email { get; set; } = default!;
}
