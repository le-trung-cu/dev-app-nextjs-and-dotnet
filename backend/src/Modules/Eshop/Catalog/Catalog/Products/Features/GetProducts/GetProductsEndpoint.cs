using Shared.Pagination;

namespace Catalog.Products.Features.GetProducts;

public record GetProductsRequest
    (string? TenantId, string? CategoryId, int PageIndex = 0, int PageSize = 10)
    : PaginationRequest(PageIndex, PageSize);

// public record GetProductsResponse(PaginatedResult<ProductDto> Products);

public class GetProductsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/eshop/products", async ([AsParameters] GetProductsRequest request, ISender sender) =>
        {
            var result = await sender.Send(new GetProductsQuery(request.TenantId, request.CategoryId, new PaginationRequest(request.PageIndex, request.PageSize)));


            return Results.Ok(result);
        })
        .WithName("GetProducts")
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .WithSummary("Get Products")
        .WithDescription("Get Products");
    }
}
