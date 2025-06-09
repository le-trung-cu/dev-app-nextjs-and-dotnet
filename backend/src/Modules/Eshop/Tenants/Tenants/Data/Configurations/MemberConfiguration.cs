namespace Tenants.Data.Configurations;

public class MemberConfiguration : IEntityTypeConfiguration<Member>
{
  public void Configure(EntityTypeBuilder<Member> builder)
  {
    builder.HasIndex(x => x.UserId).IsUnique(false);
    builder.Property(x => x.Role).HasConversion<string>();
  }
}