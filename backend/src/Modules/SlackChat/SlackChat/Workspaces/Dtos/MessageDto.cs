namespace SlackChat.Workspaces.Dtos;

public record MessageDto
{
  public Guid Id { get; set; }
  public string Body { get; set; } = default!;
  public string? ImgUrl { get; set; }
  public Guid MemberId { get; set; }
  public Guid WorkspaceId { get; set; }
  public Guid? ChannelId { get; set; }
  public Guid? ParentMessageId { get; set; }
  public Guid? ConversationId { get; set; }
  public DateTime? CreatedAt { get; set; }
  public DateTime? LastModified { get; set; }
}

public record MessageChildren(Guid ParentMessageId, int Count = 0, DateTime? Timestamp = null);
