using Docs.Documents.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docs.Data.Configurations;

public class OrganizationConfiguration : IEntityTypeConfiguration<Organization>
{
  public void Configure(EntityTypeBuilder<Organization> builder)
  {
    builder.HasKey(x => x.Id);
    builder.HasIndex(x => x.Name).IsUnique();
    builder.HasIndex(x => x.Slug).IsUnique();
    builder.HasMany(x => x.Members)
      .WithOne()
      .HasForeignKey(x => x.OrganizationId);
  }
}
