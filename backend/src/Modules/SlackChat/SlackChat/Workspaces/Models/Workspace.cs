
namespace SlackChat.Workspaces.Models;

public class Workspace : Aggregate<Guid>
{
  public string Name { get; set; } = default!;
  public string InviteToken { get; set; } = default!;
  private readonly List<Member> _members = [];
  public IReadOnlyList<Member> Members => _members.AsReadOnly();

  private Workspace(string name)
  {
    Name = name;
  }
  public static Workspace Create(string userId, string name)
  {
    ArgumentException.ThrowIfNullOrWhiteSpace(userId);
    ArgumentException.ThrowIfNullOrWhiteSpace(name);
    var workspace = new Workspace(name);
    workspace.ResetInviteToken();
    workspace.AddMember(userId, MemberRole.Owner);

    return workspace;
  }

  public string ResetInviteToken(int length = 10)
  {
    const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!#$%^&*_-+=";
    Random random = new();
    InviteToken = new string(Enumerable.Range(0, length)
        .Select(_ => chars[random.Next(chars.Length)])
        .ToArray());

    return InviteToken;
  }

  public Member AddMember(string userId, MemberRole role)
  {
    var exists = Members.Any(x => x.UserId == userId);
    if (exists)
    {
      throw new BadRequestException("This user is already registered as a member.");
    }

    var member = new Member(Id, userId, role);
    _members.Add(member);

    return member;
  }

  public Member RemoveMember(string userId)
  {
    var member = Members.FirstOrDefault(x => x.UserId == userId)
      ?? throw new MemberNotFoundException(Id, userId);

    if (member.Role == MemberRole.Owner)
    {
      var otherOwner = Members.FirstOrDefault(x => x.Role == MemberRole.Owner && x.UserId != userId)
        ?? throw new BadRequestException("Can not remove this owner user");
    }

    _members.Remove(member);

    return member;
  }


}
