using System;
using Shared.DDD;

namespace EshopMedias.Medias.Dtos;

public class MediaDto : Entity<Guid>
{
  public Guid TenantId { get; set; }
  public string Name { get; set; } = default!;
  public string Path { get; set; } = default!;
  public string Alt { get; set; } = default!;
}
