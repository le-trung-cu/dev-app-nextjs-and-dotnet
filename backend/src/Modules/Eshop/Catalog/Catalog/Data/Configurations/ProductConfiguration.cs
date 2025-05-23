namespace Catalog.Data.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
  public void Configure(EntityTypeBuilder<Product> builder)
  {
    builder.HasMany(x => x.Categories).WithMany(x => x.Products);
    builder.HasOne(x => x.Image)
      .WithMany()
      .HasForeignKey(x => x.ImageId)
      .OnDelete(DeleteBehavior.SetNull);

    builder.HasOne(x => x.Cover)
      .WithMany()
      .HasForeignKey(x => x.CoverId)
      .OnDelete(DeleteBehavior.SetNull);
  }
}
