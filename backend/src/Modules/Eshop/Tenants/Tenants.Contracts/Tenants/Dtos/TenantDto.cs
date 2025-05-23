using System;
using Shared.Models;

namespace Tenants.Contracts.Tenants.Dtos;

public record TenantDto(Guid Id, string Name, string Slug, DateTime CreatedAt, DateTime LastModified, Media Image);
