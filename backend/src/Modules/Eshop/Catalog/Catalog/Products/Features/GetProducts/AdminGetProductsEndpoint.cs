namespace Catalog.Products.Features.GetProducts;

public record AdminGetProductsRequest
    (string? TenantId, string? CategoryId, int PageIndex = 0, int PageSize = 10)
    : PaginationRequest(PageIndex, PageSize);

// public record GetProductsResponse(PaginatedResult<ProductDto> Products);

public class AdminGetProductsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/eshop/admin/products", async ([AsParameters] AdminGetProductsRequest request, ISender sender) =>
        {
            var result = await sender.Send(new GetProductsQuery(request.TenantId, request.CategoryId, new PaginationRequest(request.PageIndex, request.PageSize)));


            return Results.Ok(result);
        })
        .WithName("AdminGetProducts")
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .WithSummary("Admin Get Products")
        .WithDescription("Admin Get Products");
    }
}
