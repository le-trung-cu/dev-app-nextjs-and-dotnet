using System;
using Microsoft.EntityFrameworkCore;
using Shared.Models;

namespace EshopMedias.Data;

public class MediaDbContext(DbContextOptions<MediaDbContext> options) : DbContext(options)
{
  public DbSet<Media> Medias => Set<Media>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.HasDefaultSchema("eshop.medias");
    base.OnModelCreating(modelBuilder);
  }
}
