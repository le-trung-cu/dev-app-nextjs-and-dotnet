namespace SlackChat.Workspaces.Models;

public class Message : Entity<Guid>
{
  public string Body { get; set; } = default!;
  public string? ImgUrl { get; set; }
  public Guid MemberId { get; set; }
  public Guid WorkspaceId { get; set; }
  public Guid ChannelId { get; set; }
  public Guid? ParentMessageId { get; set; }

  public Message? ParentMessage { get; set; }

  public List<Message> Children { get; set; } = [];

  internal Message(string body, string? imgUrl, Guid memberId, Guid workspaceId, Guid channelId, Guid? parentMessageId)
  {
    Body = body;
    ImgUrl = imgUrl;
    MemberId = memberId;
    WorkspaceId = workspaceId;
    ChannelId = channelId;
    ParentMessageId = parentMessageId;
  }
}
