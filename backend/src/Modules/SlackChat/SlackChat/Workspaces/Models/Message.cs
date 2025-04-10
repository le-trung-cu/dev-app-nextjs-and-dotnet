namespace SlackChat.Workspaces.Models;

public class Message : Entity<Guid>
{
  public string Body { get; private set; } = default!;
  public string? ImgUrl { get; private set; }
  public Guid MemberId { get; private set; }
  public Guid WorkspaceId { get; private set; }
  public Guid? ChannelId { get; private set; }
  public Guid? ParentMessageId { get; private set; }
  public Guid? ConversationId { get; private set; }
  public Message? ParentMessage { get; private set; }
  private readonly List<Message> _children = [];
  public IReadOnlyList<Message> Children => _children.AsReadOnly();
  private readonly List<Reaction> _reactions = [];
  public IReadOnlyList<Reaction> Reactions => _reactions.AsReadOnly();

  internal Message(string body, string? imgUrl, Guid memberId, Guid workspaceId, Guid? channelId, Guid? parentMessageId, Guid? conversationId)
  {
    Body = body;
    ImgUrl = imgUrl;
    MemberId = memberId;
    WorkspaceId = workspaceId;
    ChannelId = channelId;
    ParentMessageId = parentMessageId;
    ConversationId = conversationId;
  }

  public void Update(string body)
  {
    Body = body;
  }

  public Reaction? ToggleReaction(Guid memberId, string value)
  {
    var existReaction = _reactions.FirstOrDefault(x => x.MemberId == memberId && x.Value == value);
    if (existReaction != null)
    {
      _reactions.Remove(existReaction);
      return null;
    }

    var newReaction = new Reaction(WorkspaceId, Id, memberId, value);
    _reactions.Add(newReaction);

    return newReaction;
  }
}
