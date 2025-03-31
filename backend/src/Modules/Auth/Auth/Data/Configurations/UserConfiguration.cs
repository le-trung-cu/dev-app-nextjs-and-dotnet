using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Auth.Data.Configurations;

public class UserConfiguration()
  : IEntityTypeConfiguration<User>
{
  public void Configure(EntityTypeBuilder<User> builder)
  {
    var hasher = new PasswordHasher<User>();

    builder.Property(x => x.Name).IsRequired().HasMaxLength(20);
    builder.HasIndex(x => x.Name);
    
    var admin = new User
    {
      Id = "1a2b3c4d-1234-5678-9101-abcdefabcdef",
      UserName="admin",
      NormalizedUserName="admin",
      Name = "admin",
      Email = "admin@gmail.com",
      NormalizedEmail = "ADMIN@GMAIL.COM",
    };
    admin.PasswordHash = hasher.HashPassword(admin, "Admin@123");
    builder.HasData(admin);
  }
}
