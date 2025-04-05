using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SlackChat.Data.Configurations;

public class WorkspaceConfiguration : IEntityTypeConfiguration<Workspace>
{
  public void Configure(EntityTypeBuilder<Workspace> builder)
  {
    builder
      .HasMany(x => x.Members)
      .WithOne()
      .HasForeignKey(x => x.WorkspaceId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
