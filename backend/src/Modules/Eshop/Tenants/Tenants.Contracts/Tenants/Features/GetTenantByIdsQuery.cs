
namespace Tenants.Contracts.Tenants.Features;

public record GetTenantByIdsQuery(IEnumerable<Guid> Ids):IQuery<GetTenantByIdsResult>;

public record GetTenantByIdsResult(bool IsSuccess, IEnumerable<TenantDto> Tenants);