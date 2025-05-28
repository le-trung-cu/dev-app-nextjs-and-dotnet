using System;

namespace Docs.Organizations.Dtos;

public record OrganizationDto
{
  public Guid Id { get; set; }
  public string Name { get; set; } = default!;
  public string Slug { get; set; } = default!;
  public string? ImgUrl { get; set; }
  public List<MemberDto> Members { get; set; } = [];
}
