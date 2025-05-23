namespace Tenants.Tenants.Features.GetTenant;

public class GetTenantBySlugHandler
  (TenantDbContext dbContext)
  : IQueryHandler<GetTenantByIdQuery, GetTenantByIdResult>
{
  public async Task<GetTenantByIdResult> Handle(GetTenantByIdQuery query, CancellationToken cancellationToken)
  {
    var tenantQuery = dbContext.Tenants.AsNoTracking();
    if (Guid.TryParse(query.Id, out Guid tenantId))
    {
      tenantQuery = tenantQuery.Where(x => x.Id == tenantId);
    }
    else
    {
      tenantQuery = tenantQuery.Where(x => x.Slug == query.Id);
    }

    var tenant = await tenantQuery
      .Include(x => x.Image)
      .FirstOrDefaultAsync(cancellationToken)
    ?? throw new TenantNotFoundException(query.Id);

    return new GetTenantByIdResult(true, tenant.Adapt<TenantDto>());
  }
}
