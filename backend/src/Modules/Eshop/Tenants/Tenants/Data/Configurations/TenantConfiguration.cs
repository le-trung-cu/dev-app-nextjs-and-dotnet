namespace Tenants.Data.Configurations;

public class TenantConfiguration : IEntityTypeConfiguration<Tenant>
{
  public void Configure(EntityTypeBuilder<Tenant> builder)
  {
    builder.Property(x => x.Name).HasMaxLength(200);
    builder.Property(x => x.Slug).HasMaxLength(200);

    builder.HasOne(x => x.Image)
      .WithMany()
      .HasForeignKey(x => x.ImageId)
      .OnDelete(DeleteBehavior.SetNull);

    builder.HasIndex(x => x.Name).IsUnique();
    builder.HasIndex(x => x.Slug).IsUnique();

    builder.HasMany(x => x.Members).WithOne().HasForeignKey(x => x.TenantId);
  }
}
