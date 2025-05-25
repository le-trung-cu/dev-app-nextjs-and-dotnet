using Microsoft.EntityFrameworkCore;

namespace Shared.Data.Seed;

public interface IDataSeeder
{
  Task SeedAllAsync();
}

public interface IDataSeeder<TContext> : IDataSeeder where TContext : DbContext
{
}