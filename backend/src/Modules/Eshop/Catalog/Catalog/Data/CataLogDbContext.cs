using System;
using System.Reflection;
using Catalog.Products.Models;
using Microsoft.EntityFrameworkCore;
using Shared.Models;

namespace Catalog.Data;

public class CatalogDbContext(DbContextOptions<CatalogDbContext> options) : DbContext(options)
{
  public DbSet<Category> Categories => Set<Category>();
  public DbSet<Product> Products => Set<Product>();


  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.HasDefaultSchema("eshop.catalog");
    modelBuilder.Entity<Media>().ToTable("Medias", "eshop.medias");
    base.OnModelCreating(modelBuilder);
    modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
  }
}
