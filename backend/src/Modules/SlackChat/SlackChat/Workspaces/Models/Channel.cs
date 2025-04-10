namespace SlackChat.Workspaces.Models;

public class Channel : Entity<Guid>
{
  public string Name { get; set; } = default!;
  public Guid WorkspaceId { get; set; }

  internal Channel(string name)
  {
    Name = name;
  }
}
