using Shared.DDD;

namespace Tenants.Tenants.Models;

public class Tenant : Aggregate<Guid>
{
  public string Name { get; private set; } = default!;
  public string Slug { get; private set; } = default!;
}
