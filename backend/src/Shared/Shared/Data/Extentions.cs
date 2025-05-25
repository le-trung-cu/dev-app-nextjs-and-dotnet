using Microsoft.EntityFrameworkCore;
using Shared.Data.Seed;

namespace Shared.Data;

public static class Extentions
{
  public static IApplicationBuilder UseMigration<TContext>(this IApplicationBuilder app)
      where TContext : DbContext
  {
    MigrateDatabaseAsync<TContext>(app.ApplicationServices).GetAwaiter().GetResult();
    SeedDataAsync<TContext>(app.ApplicationServices).GetAwaiter().GetResult();
    return app;
  }
  private static async Task MigrateDatabaseAsync<TContext>(IServiceProvider serviceProvider)
      where TContext : DbContext
  {
    using var scope = serviceProvider.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<TContext>();
    await context.Database.MigrateAsync();
  }

  private static async Task SeedDataAsync(IServiceProvider serviceProvider)
  {
    using var scope = serviceProvider.CreateScope();
    var seeders = scope.ServiceProvider.GetServices<IDataSeeder>();
    foreach (var seeder in seeders)
    {
      await seeder.SeedAllAsync();
    }
  }

  private static async Task SeedDataAsync<TContext>(IServiceProvider serviceProvider)
  where TContext : DbContext
  {
    using var scope = serviceProvider.CreateScope();
    var seeders = scope.ServiceProvider
        .GetServices<IDataSeeder>()
        .Where(s => s is IDataSeeder<TContext>)
        .Cast<IDataSeeder>();

    foreach (var seeder in seeders)
    {
      await seeder.SeedAllAsync();
    }
  }
}
