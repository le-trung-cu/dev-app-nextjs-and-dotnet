using System.Reflection;

namespace SlackChat.Data;

public class WorkspaceDbContext(DbContextOptions<WorkspaceDbContext> options) : DbContext(options)
{
  public DbSet<Workspace> Workspaces => Set<Workspace>();
  public DbSet<Member> Members => Set<Member>();
  public DbSet<Channel> Channels => Set<Channel>();
  public DbSet<Message> Messages => Set<Message>();
  public DbSet<Reaction> Reactions => Set<Reaction>();

  protected override void OnModelCreating(ModelBuilder builder)
  {
    builder.HasDefaultSchema("slack_chat");
    base.OnModelCreating(builder);
    builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
  }
}
