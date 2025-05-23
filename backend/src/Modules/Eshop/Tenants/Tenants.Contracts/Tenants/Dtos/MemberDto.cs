using Tenants.Contracts.Tenants.ValueObjects;

namespace Tenants.Contracts.Tenants.Dtos;

public record MemberDto(Guid TenantId, string UserId, MemberRole Role);
