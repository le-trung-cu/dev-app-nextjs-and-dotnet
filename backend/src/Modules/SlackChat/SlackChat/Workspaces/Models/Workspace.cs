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

  private readonly List<Message> _messages = [];

  public IReadOnlyList<Message> Messages => _messages.AsReadOnly();

  private readonly List<Conversation> _conversations = [];
  public IReadOnlyList<Conversation> Conversations => _conversations.AsReadOnly();

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
    workspace.AddMember(userId, MemberRole.Admin);
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

  public Member UpdateMember(string userId, MemberRole role)
  {
    var member = Members.FirstOrDefault(x => x.UserId == userId)
      ?? throw new MemberNotFoundException(Id, userId);
    member.Role = role;
    return member;
  }

  public Member RemoveMember(string userId)
  {
    var member = Members.FirstOrDefault(x => x.UserId == userId)
      ?? throw new MemberNotFoundException(Id, userId);

    if (member.Role == MemberRole.Admin)
    {
      var otherOwner = Members.FirstOrDefault(x => x.Role == MemberRole.Admin && x.UserId != userId)
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

  public Channel UpdateChannel(Guid channelId, string name)
  {
    ArgumentException.ThrowIfNullOrWhiteSpace(name);
    name = Regex.Replace(name, @"\s+", "-");
    var exists = _channels.Any(x => x.Id != channelId && x.Name == name);
    if (exists)
    {
      throw new ChannelNameExistsException(name);
    }
    var channel = _channels.FirstOrDefault(x => x.Id == channelId)
    ?? throw new ChannelNotFoundException(channelId);
    channel.Name = name;

    return channel;
  }

  public Channel RemoveChannel(Guid channelId)
  {
    var channel = _channels.FirstOrDefault(x => x.Id == channelId)
      ?? throw new ChannelNotFoundException(channelId);

    _channels.Remove(channel);

    return channel;
  }

  public Message AddMessage(Guid? channelId, string body, string? imgUrl, Guid memberId, Guid? parentMessageId, Guid? conversationId)
  {
    Channel? channel = null;
    Message? parentMessage = null;
    if (channelId.HasValue)
    {
      channel = _channels.FirstOrDefault(x => x.Id == channelId.Value)
        ?? throw new ChannelNotFoundException(channelId.Value);
    }
    if (parentMessageId.HasValue)
    {
      parentMessage = _messages.FirstOrDefault(x => x.Id == parentMessageId.Value)
        ?? throw new MessageNotFoundException(parentMessageId.Value);
    }

    if (conversationId.HasValue)
    {
      var conversation = _conversations.FirstOrDefault(x => x.Id == conversationId.Value)
        ??throw new ConversationNotFoundException(conversationId.Value);

      var checkMember = conversation.MemberOneId == memberId || conversation.MemberTwoId == memberId;
      if (!checkMember)
      {
        throw new BadRequestException("Unauthorized");
      }
    }

    // Only possible if we are replying in a thread in 1:1 conversation
    if (!conversationId.HasValue && !channelId.HasValue && parentMessageId.HasValue)
    {
      conversationId = parentMessage!.ConversationId;
    }

    var message = new Message(body, imgUrl, memberId, Id, channelId, parentMessageId, conversationId);
    _messages.Add(message);

    return message;
  }

  public Message UpdateMessage(Guid messageId, string body)
  {
    ArgumentException.ThrowIfNullOrWhiteSpace(body);

    var message = _messages.FirstOrDefault(x => x.Id == messageId)
      ?? throw new MessageNotFoundException(messageId);
    message.Update(body);

    return message;
  }

  public Message DeleteMessage(Guid messageId)
  {
    var message = _messages.FirstOrDefault(x => x.Id == messageId)
      ?? throw new MessageNotFoundException(messageId);
    _messages.Remove(message);
    return message;
  }

  public Conversation AddConversation(string userId1, string userId2)
  {
    var member1 = _members.FirstOrDefault(x => x.UserId == userId1)
      ?? throw new MemberNotFoundException(userId1);
    var member2 = _members.FirstOrDefault(x => x.UserId == userId2)
      ?? throw new MemberNotFoundException(userId2);

    (member1, member2) = (member2, member1);
    var conversation = Conversation.Create(Id, member1.Id, member2.Id);
    _conversations.Add(conversation);

    return conversation;
  }
}
