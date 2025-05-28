using Shared.Exceptions;

namespace Docs.Organizations.Exceptions;

public class MemberNotFoundException
  : NotFoundException
{
  public MemberNotFoundException(string userId) : base("Member", userId)
  {
  }

   public MemberNotFoundException(Guid organizationId, string userId) : base("Member", $"[${organizationId}, ${userId}]")
  {

  }
}
