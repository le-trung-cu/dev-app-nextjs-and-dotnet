using System.Text.RegularExpressions;

namespace SlackChat.Workspaces.Models;

public class Workspace : Aggregate<Guid>
{
  public string Name { get; set; } = default!;
  public string InviteToken { get; set; } = default!;
  private readonly List<Member> _members = [];
  private readonly List<Channel> _channels = [];
  public IReadOnlyList<Member> Members => _members.AsReadOnly();
  public IReadOnlyList<Channel> Channels => _channels.AsReadOnly();

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
    workspace.AddChannel("channel-general");
    return workspace;
  }

  public void Update(string name)
  {
    Name = name;
  }

  public string ResetInviteToken(int length = 6)
  {
    const string chars = "0123456789";
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

  public Channel AddChannel(string name)
  {
    ArgumentException.ThrowIfNullOrWhiteSpace(name);
    name = Regex.Replace(name, @"\s+", "-");
    var exists = _channels.Any(x => x.Name == name);
    if (exists)
    {
      throw new ChannelNameExistsException(name);
    }
    var channel = new Channel(name);
    _channels.Add(channel);

    return channel;
  }

  public Channel RemoveChannel(Guid channelId)
  {
    var channel = _channels.FirstOrDefault(x => x.Id == channelId)
      ?? throw new ChannelNotFoundException(channelId);

    _channels.Remove(channel);

    return channel;
  }
}
