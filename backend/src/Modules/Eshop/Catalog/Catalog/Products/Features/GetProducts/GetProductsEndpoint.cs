using Shared.Pagination;

namespace Catalog.Products.Features.GetProducts;

// public record GetProductsResponse(PaginatedResult<ProductDto> Products);

public class GetProductsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/eshop/products", async ([AsParameters] GetProductsQuery request, ISender sender) =>
        {
            var result = await sender.Send(request);

            return Results.Ok(result);
        })
        .WithName("GetProducts")
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .WithSummary("Get Products")
        .WithDescription("Get Products");
    }
}
