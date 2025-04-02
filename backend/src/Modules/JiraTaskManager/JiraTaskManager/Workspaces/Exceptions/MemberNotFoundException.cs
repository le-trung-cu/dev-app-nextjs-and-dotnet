namespace JiraTaskManager.Workspaces.Exceptions;

public class MemberNotFoundException
  : NotFoundException
{
  public MemberNotFoundException(string userId) : base("Member", userId)
  {
  }

   public MemberNotFoundException(Guid workspaceId, string userId) : base("Member", $"[${workspaceId}, ${userId}]")
  {

  }
}
