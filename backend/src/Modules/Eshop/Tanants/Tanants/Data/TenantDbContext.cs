using System.Reflection;

namespace Tenants.Data;

public class TenantDbContext(DbContextOptions<TenantDbContext> options) : DbContext(options)
{
  public DbSet<Tenant> Tenants => Set<Tenant>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);
    modelBuilder.HasDefaultSchema("eshop.tenants");
    modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
  }
}
