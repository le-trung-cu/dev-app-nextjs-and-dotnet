using Docs.Organizations.ValueObjects;
using Shared.DDD;

namespace Docs.Organizations.Models;

public class Member : Entity<Guid>
{
  public Member(Guid organizationId, string userId, MemberRole role)
  {
    UserId = userId;
    OrganizationId = organizationId;
    Role = role;
    IsJoined = false;
  }

  public void ApproveInvite()
  {
    IsJoined = true;
  }

  public void UpdateRole(MemberRole role)
  {
    Role = role;
  }

  public Guid OrganizationId { get; private set; }
  public string UserId { get; private set; } = default!;
  public MemberRole Role { get; private set; } = MemberRole.Member;
  public bool IsJoined { get; private set; }
}
