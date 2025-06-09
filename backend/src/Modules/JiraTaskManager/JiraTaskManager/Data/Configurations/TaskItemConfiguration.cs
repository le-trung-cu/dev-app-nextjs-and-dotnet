using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JiraTaskManager.Data.Configurations;

public class TaskItemConfiguration : IEntityTypeConfiguration<TaskItem>
{
  public void Configure(EntityTypeBuilder<TaskItem> builder)
  {
    builder
      .HasOne(x => x.Assignee)
      .WithMany(x => x.Tasks)
      .HasForeignKey(x => x.AssigneeId)
      .IsRequired(false)
      .OnDelete(DeleteBehavior.SetNull);

    builder
      .HasOne(x => x.Project)
      .WithMany()
      .HasForeignKey(x => x.ProjectId)
      .IsRequired(false)
      .OnDelete(DeleteBehavior.SetNull);

    builder.Property(x => x.Priority).HasConversion<string>();
  }
}
