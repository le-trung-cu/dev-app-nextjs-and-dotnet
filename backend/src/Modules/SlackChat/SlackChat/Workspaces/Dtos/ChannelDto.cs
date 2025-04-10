namespace SlackChat.Workspaces.Dtos;

public class ChannelDto(Guid id, string name, DateTime createdAt)
{
  public Guid Id { get; set; } = id;
  public string Name { get; set; } = name;
  public DateTime CreatedAt { get; set; } = createdAt;
}
