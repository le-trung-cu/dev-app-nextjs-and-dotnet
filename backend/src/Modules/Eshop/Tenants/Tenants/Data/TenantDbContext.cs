using System.Reflection;
using Shared.Models;

namespace Tenants.Data;

public class TenantDbContext(DbContextOptions<TenantDbContext> options) : DbContext(options)
{
  public DbSet<Tenant> Tenants => Set<Tenant>();
  public DbSet<Member> Members => Set<Member>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.HasDefaultSchema("eshop.tenants");
    modelBuilder.Entity<Media>().ToTable("Medias", "eshop.medias");
    
    base.OnModelCreating(modelBuilder);
    modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
  }
}
