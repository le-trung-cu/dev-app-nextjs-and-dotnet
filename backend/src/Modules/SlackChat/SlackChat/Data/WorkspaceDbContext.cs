namespace SlackChat.Data;

public class WorkspaceDbContext(DbContextOptions<WorkspaceDbContext> options) : DbContext(options)
{
  public DbSet<Workspace> Workspaces => Set<Workspace>();
  public DbSet<Member> Members => Set<Member>();

  protected override void OnModelCreating(ModelBuilder builder)
  {
    builder.HasDefaultSchema("slack_chat");
    base.OnModelCreating(builder);
    
  }
}
