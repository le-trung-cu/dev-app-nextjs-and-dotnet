using System;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Auth.Data.Configurations;

public class UserRoleConfiguration : IEntityTypeConfiguration<IdentityUserRole<string>>
{
  public void Configure(EntityTypeBuilder<IdentityUserRole<string>> builder)
  {
    builder.HasData(
      new IdentityUserRole<string>
      {
        UserId = "1a2b3c4d-1234-5678-9101-abcdefabcdef",
        RoleId = "admin"
      }
    );
  }
}
