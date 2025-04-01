using System.Reflection;

namespace JiraTaskManager.Data;

public class WorkspaceDbContext(DbContextOptions<WorkspaceDbContext> options) : DbContext(options)
{
  public DbSet<TaskItem> TaskItems => Set<TaskItem>();
  public DbSet<Workspace> Workspaces => Set<Workspace>();
  public DbSet<Member> Members => Set<Member>();
  public DbSet<Project> Projects => Set<Project>();

  protected override void OnModelCreating(ModelBuilder builder)
  {
    builder.HasDefaultSchema("jira_task_manager_workspaces");
    base.OnModelCreating(builder);

    builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
  }
}
