namespace Catalog.Products.Features.GetProducts;


public record AdminGetProductsQuery
    : PaginationRequest, IQuery<AdminGetProductsResult>
{
  public string? TenantId { get; set; }
  public string? CategoryId { get; set; }
}
public record AdminGetProductsResult(PaginatedResult<ProductDto> Products, IEnumerable<TenantDto> Tenants);

internal class AdminGetProductsHandler
  (CatalogDbContext dbContext, ClaimsPrincipal user, ISender sender)
  : IQueryHandler<AdminGetProductsQuery, AdminGetProductsResult>
{
  public async Task<AdminGetProductsResult> Handle(AdminGetProductsQuery query, CancellationToken cancellationToken)
  {
    // get products using dbContext
    // return result
    var productsQuery = dbContext.Products.AsNoTracking();

    if (!user.IsSuperAdmin())
    {
      var _userId = user.GetUserId();
      var _tenants = await sender.Send(new GetTenantsQuery(), cancellationToken);
      var _tenantIds = _tenants.Tenants.Select(x => x.Id);
      productsQuery = productsQuery.Where(x => _tenantIds.Contains(x.TenantId));
    }


    if (!string.IsNullOrWhiteSpace(query.TenantId))
    {
      var result = await sender.Send(new GetTenantByIdQuery(query.TenantId), cancellationToken);
      productsQuery = productsQuery.Where(x => x.TenantId == result.Tenant.Id);
    }

    if (!string.IsNullOrWhiteSpace(query.CategoryId))
    {
      var result = await sender.Send(new GetCategoryBySlugQuery(query.CategoryId), cancellationToken);

      productsQuery = productsQuery.Where(x => x.Categories.Any(t => x.Id == result.Category.Id));
    }
    productsQuery = productsQuery
      .Include(x => x.Image)
      .Include(x => x.Cover)
      .Include(x => x.Categories);

    var totalCount = await productsQuery.LongCountAsync(cancellationToken);


    var pageIndex = query.PageIndex;
    var pageSize = query.PageSize;
    var products = await productsQuery.OrderBy(p => p.Name)
                    .Skip(pageSize * (pageIndex - 1))
                    .Take(pageSize)
                    .ToListAsync(cancellationToken);

    var tenantIds = products.Select(x => x.TenantId);
    var resultTenants = await sender.Send(new GetTenantByIdsQuery(tenantIds), cancellationToken);

    //mapping product entity to ProductDto using Mapster
    var productDtos = products.Adapt<List<ProductDto>>();

    return new AdminGetProductsResult(
        new PaginatedResult<ProductDto>(
            pageIndex,
            pageSize,
            totalCount,
            productDtos),
        resultTenants.Tenants
        );
  }
}
