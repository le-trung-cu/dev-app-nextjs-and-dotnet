using System;

namespace Tenants.Contracts.Tenants.Features;


public record GetTenantsQuery() : IQuery<GetTenantsResult>;
public record GetTenantsResult(bool IsSuccess, IEnumerable<TenantDto> Tenants);