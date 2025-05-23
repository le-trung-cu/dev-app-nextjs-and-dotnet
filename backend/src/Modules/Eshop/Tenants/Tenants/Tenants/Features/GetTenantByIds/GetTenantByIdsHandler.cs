namespace Tenants.Tenants.Features.GetTenantByIds;

public class GetTenantByIdsHandler
  (TenantDbContext dbContext)
  : IQueryHandler<GetTenantByIdsQuery, GetTenantByIdsResult>
{
  public async Task<GetTenantByIdsResult> Handle(GetTenantByIdsQuery query, CancellationToken cancellationToken)
  {
    var tenants = await dbContext.Tenants
      .Where(x => query.Ids.Contains(x.Id))
      .ToListAsync(cancellationToken);
    return new GetTenantByIdsResult(true, tenants.Adapt<IEnumerable<TenantDto>>());
  }
}
