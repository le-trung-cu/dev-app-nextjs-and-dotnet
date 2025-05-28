using System;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docs.Data.Configurations;

public class MemberConfiguration : IEntityTypeConfiguration<Member>
{
  public void Configure(EntityTypeBuilder<Member> builder)
  {
    // builder.HasIndex(x => new { x.OrganizationId, x.UserId });
    builder.Property(x => x.Role).HasConversion<string>();
  }
}
