namespace Auth.Data.Configurations;

public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
{
  public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<IdentityRole> builder)
  {
    builder.HasData(
      new IdentityRole
      {
        Id = "manager",
        Name = "Manager",
        NormalizedName = "MANAGER",
      },
      new IdentityRole
      {
        Id="admin",
        Name = "Administrator",
        NormalizedName = "ADMINISTRATOR"
      }
    );
  }
}
