using System.Reflection;


namespace Docs.Data;

public class DocumentDbContext(DbContextOptions<DocumentDbContext> options) : DbContext(options)
{
  public DbSet<Document> Documents => Set<Document>();

  public DbSet<Organization> Organizations => Set<Organization>();
  public DbSet<Member> Members => Set<Member>();

  protected override void OnModelCreating(ModelBuilder builder)
  {
    builder.HasDefaultSchema("docs");
    base.OnModelCreating(builder);
    builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
  }
}
