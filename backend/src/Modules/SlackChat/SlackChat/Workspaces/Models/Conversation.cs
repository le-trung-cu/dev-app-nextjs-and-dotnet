namespace SlackChat.Workspaces.Models;

public class Conversation : Entity<Guid>
{
  public Guid WorkspaceId { get; private set; }
  public Guid MemberOneId { get; private set; }
  public Guid MemberTwoId { get; private set; }
  public Member? MemberOne { get; private set; }
  public Member? MemberTwo { get; private set; }

  public static Conversation Create(Guid workspaceId, Guid memberOneId, Guid memberTwoId)
  {
    var conversation = new Conversation
    {
      WorkspaceId = workspaceId,
      MemberOneId = memberOneId,
      MemberTwoId = memberTwoId,
    };

    return conversation;
  }
}
