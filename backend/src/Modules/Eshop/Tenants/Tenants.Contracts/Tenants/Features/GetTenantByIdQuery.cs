namespace Tenants.Contracts.Tenants.Features;

public record GetTenantByIdQuery(string Id):IQuery<GetTenantByIdResult>;

public record GetTenantByIdResult(bool IsSuccess, TenantDto Tenant);