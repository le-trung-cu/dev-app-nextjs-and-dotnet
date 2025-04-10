namespace SlackChat.Workspaces.Models;

public class Conversation : Entity<Guid>
{
  public Guid WorkspaceId { get; set; }
  public Guid MemberOneId { get; set; }
  public Guid MemeberTwoId { get; set; }
}
