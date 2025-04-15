using System.Reflection;
using Docs.Documents.Models;
using Microsoft.EntityFrameworkCore;

namespace Docs.Data;

public class DocumentDbContext(DbContextOptions<DocumentDbContext> options) : DbContext(options)
{
  public DbSet<Document> Documents => Set<Document>();

  protected override void OnModelCreating(ModelBuilder builder)
  {
    base.OnModelCreating(builder);
    builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
  }
}
