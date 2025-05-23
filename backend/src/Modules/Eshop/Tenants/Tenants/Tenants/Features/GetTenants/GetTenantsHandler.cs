namespace Tenants.Tenants.Features.GetTenants;

public class GetTenantsHandler
  (TenantDbContext dbContext, ClaimsPrincipal user)
  : IQueryHandler<GetTenantsQuery, GetTenantsResult>
{
  public async Task<GetTenantsResult> Handle(GetTenantsQuery query, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var tenantsQuery = dbContext.Tenants.AsNoTracking();
    if (!user.IsSuperAdmin())
    {
      tenantsQuery = tenantsQuery.Where(x => x.Members.Any(m => m.UserId == userId));
    }

    var tenants = await tenantsQuery.Include(x => x.Image).ToListAsync(cancellationToken);

    return new GetTenantsResult(true, tenants.Adapt<IEnumerable<TenantDto>>());
  }
}
