using System;
using Shared.DDD;

namespace Shared.Models;

public class Media : Entity<Guid>
{
  public Guid? TenantId { get; set; }
  public string Name { get; set; } = default!;
  public string Path { get; set; } = default!;
  public string Alt { get; set; } = default!;

  public static Media Create(Guid id, Guid tenantId, string name, string alt, string path)
  {
    var media = new Media
    {
      Id = id,
      TenantId = tenantId,
      Name = name,
      Alt = alt,
      Path = path
    };
    return media;
  }

  public void Update(string name, string alt, string path)
  {
    Name = name;
    Alt = alt;
    Path = path;
  }
}
