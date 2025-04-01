using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JiraTaskManager.Data.Configurations;

public class WorkspaceConfiguration : IEntityTypeConfiguration<Workspace>
{
  public void Configure(EntityTypeBuilder<Workspace> builder)
  {
    builder
      .HasMany(x => x.Members)
      .WithOne()
      .HasForeignKey(x => x.WorkspaceId)
      .OnDelete(DeleteBehavior.Cascade);

    builder
      .HasMany(x=> x.Projects)
      .WithOne()
      .HasForeignKey(x => x.WorkspaceId)
      .OnDelete(DeleteBehavior.Cascade);

    builder
      .HasMany(x => x.Tasks)
      .WithOne()
      .HasForeignKey(x => x.WorkspaceId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
