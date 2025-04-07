namespace SlackChat.Workspaces.Dtos;

public class ChannelDto(Guid id, string name)
{
  public Guid Id { get; set; } = id;
  public string Name { get; set; } = name;
}
