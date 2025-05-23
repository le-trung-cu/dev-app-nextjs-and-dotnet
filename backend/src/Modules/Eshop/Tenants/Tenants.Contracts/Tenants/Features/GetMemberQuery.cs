using Tenants.Contracts.Tenants.ValueObjects;

namespace Tenants.Contracts.Tenants.Features;

public record GetMemberQuery(Guid TenantId, string UserId) : IQuery<GetMemberResult>;

public record GetMemberResult(bool IsSuccess, MemberDto Member);