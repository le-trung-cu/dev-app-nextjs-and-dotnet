namespace JiraTaskManager.Workspaces.Exceptions;

public class MemberNotFoundException
  : NotFoundException
{
  public MemberNotFoundException(Guid memberId) : base("Member", memberId)
  {

  }

   public MemberNotFoundException(Guid workspaceId, string userId) : base("Member", $"[${workspaceId}, ${userId}]")
  {

  }
}
