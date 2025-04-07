namespace SlackChat.Workspaces.Models;

public class Channel : Entity<Guid>
{
  public string Name { get; set; } = default!;
  public Guid WorkspaceId { get; set; }

  private readonly List<Message> _messages = [];

  public IReadOnlyList<Message> Messages => _messages.AsReadOnly();

  internal Channel(string name)
  {
    Name = name;
  }

  public Message AddMessage(string body, string? imgUrl, Guid memberId, Guid? parentMessageId)
  {
    if (parentMessageId.HasValue)
    {
      var parentMessage = _messages.FirstOrDefault(x => x.Id == parentMessageId.Value)
        ?? throw new MessageNotFoundException(parentMessageId.Value);
    }
    var message = new Message(body, imgUrl, memberId, WorkspaceId, Id, parentMessageId);
    _messages.Add(message);
    
    return message;
  }
}
