using Shared.Contracts.CQRS;
using Tenants.Contracts.Tenants.Dtos;

namespace Catalog.Contracts.Products.Features.GetProductById;

public record GetProductByIdQuery(string Id)
    : IQuery<GetProductByIdResult>;
public record GetProductByIdResult(ProductDto Product, TenantDto Tenant);
