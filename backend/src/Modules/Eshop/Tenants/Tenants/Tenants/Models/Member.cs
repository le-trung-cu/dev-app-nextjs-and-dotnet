
namespace Tenants.Tenants.Models;

public class Member : Entity<Guid>
{
  public Guid TenantId { get; private set; }
  public string UserId { get; private set; } = default!;
  public MemberRole Role {get; private set;} = MemberRole.Admin;

  internal Member(Guid tenantId, string userId, MemberRole role)
  {
    TenantId = tenantId;
    UserId = userId;
    Role = role;
  }

  public void UpdateRole(MemberRole role)
  {
    Role = role;
  }
}
