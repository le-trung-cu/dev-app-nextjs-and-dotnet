
namespace Docs.Organizations.Dtos;

public class MemberDto
{
  public MemberDto(Guid id, Guid organizationId, string userId, MemberRole role, bool isJoined, string name, string email)
  {
    OrganizationId = organizationId;
    Id = id;
    UserId = userId;
    Role = role;
    Name = name;
    Email = email;
    IsJoined = isJoined;
  }

  public Guid Id { get; set; }
  public Guid OrganizationId { get; set; }
  public string UserId { get; set; } = default!;
  public MemberRole Role { get; set; }
  public string Name { get; set; } = default!;
  public string Email { get; set; } = default!;
  public bool IsJoined { get; set; }
}
