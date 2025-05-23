using Catalog.Contracts.Products.Features.GetProductById;
using Tenants.Contracts.Tenants.Dtos;
using Tenants.Contracts.Tenants.Features;

namespace Catalog.Products.Features.GetProductById;

//public record GetProductByIdQuery(Guid Id)
//    : IQuery<GetProductByIdResult>;
//public record GetProductByIdResult(ProductDto Product);

internal class GetProductByIdHandler
  (CatalogDbContext dbContext, ISender sender)
  : IQueryHandler<GetProductByIdQuery, GetProductByIdResult>
{
  public async Task<GetProductByIdResult> Handle(GetProductByIdQuery query, CancellationToken cancellationToken)
  {
    // get products by id using dbContext
    // return result

    var productQuery = dbContext.Products
                    .AsNoTracking();

    if (Guid.TryParse(query.Id, out var productId))
    {
      productQuery = productQuery.Where(p => p.Id == productId);
    }
    else
    {
      // productQuery = productQuery.Where(p => p.Slug == query.Id);
    }

    productQuery = productQuery.Include(x => x.Image)
                    .Include(x => x.Cover)
                    .Include(x => x.Categories)
                    .AsQueryable();

    var product = await productQuery.SingleOrDefaultAsync(cancellationToken) ?? throw new ProductNotFoundException(query.Id);

    var tenant = await sender.Send(new GetTenantByIdQuery(product.TenantId.ToString()), cancellationToken);

    //mapping product entity to productdto
    var productDto = product.Adapt<ProductDto>();
    var tenantDto = tenant.Adapt<TenantDto>();

    return new GetProductByIdResult(productDto, tenantDto);
  }
}
