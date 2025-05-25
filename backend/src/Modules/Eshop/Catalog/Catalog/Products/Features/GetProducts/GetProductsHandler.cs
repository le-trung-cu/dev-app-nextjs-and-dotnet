using Catalog.Products.Features.GetCategory;
using Shared.Pagination;
using Tenants.Contracts.Tenants.Dtos;
using Tenants.Contracts.Tenants.Features;

namespace Catalog.Products.Features.GetProducts;

public record GetProductsQuery
	: PaginationRequest, IQuery<GetProductsResult>
{
	public string? TenantId { get; set; }
	public string? CategoryId { get; set; }
}
public record GetProductsResult(PaginatedResult<ProductDto> Products, IEnumerable<TenantDto> Tenants);

internal class GetProductsHandler(CatalogDbContext dbContext, ISender sender)
		: IQueryHandler<GetProductsQuery, GetProductsResult>
{
	public async Task<GetProductsResult> Handle(GetProductsQuery query, CancellationToken cancellationToken)
	{
		// get products using dbContext
		// return result

		var pageIndex = query.PageIndex;
		var pageSize = query.PageSize;


		var productsQuery = dbContext.Products.AsNoTracking();

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

		var products = await productsQuery.OrderBy(p => p.Name)
										.Skip(pageSize * (pageIndex - 1))
										.Take(pageSize)
										.ToListAsync(cancellationToken);

		var tenantIds = products.Select(x => x.TenantId);
		var tenants = await sender.Send(new GetTenantByIdsQuery(tenantIds), cancellationToken);

		//mapping product entity to ProductDto using Mapster
		var productDtos = products.Adapt<List<ProductDto>>();

		return new GetProductsResult(
				new PaginatedResult<ProductDto>(
						pageIndex,
						pageSize,
						totalCount,
						productDtos),
				tenants.Tenants
				);
	}
}
