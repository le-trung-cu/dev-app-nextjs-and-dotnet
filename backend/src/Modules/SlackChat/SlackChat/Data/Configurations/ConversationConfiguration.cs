using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SlackChat.Data.Configurations;

public class ConversationConfiguration : IEntityTypeConfiguration<Conversation>
{
  public void Configure(EntityTypeBuilder<Conversation> builder)
  {
    builder
      .HasOne(x => x.MemberOne)
      .WithMany()
      .HasForeignKey(x => x.MemberOneId);

    builder
      .HasOne(x => x.MemberTwo)
      .WithMany()
      .HasForeignKey(x => x.MemberTwoId);

    builder.HasIndex(x => new { x.MemberOneId, x.MemberTwoId }).IsUnique();
  }
}
