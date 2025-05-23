using System;
using Shared.Data.Seed;

namespace Tenants.Data.Seed;

public class TenantDataSeeder
  (TenantDbContext dbContext)
  : IDataSeeder
{
  public async Task SeedAllAsync()
  {
    
  }
}
