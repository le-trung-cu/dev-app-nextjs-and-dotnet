namespace SlackChat.Workspaces.Models;

public class Reaction : Entity<Guid>
{
  public Reaction(Guid workspaceId, Guid messageId, Guid memberId, string value)
  {
    WorkspaceId = workspaceId;
    MessageId = messageId;
    MemberId = memberId;
    Value = value;
  }

  public Guid WorkspaceId { get; set; }
  public Guid MessageId { get; set; }
  public Guid MemberId { get; set; }
  public string Value { get; set; } = default!;
}
