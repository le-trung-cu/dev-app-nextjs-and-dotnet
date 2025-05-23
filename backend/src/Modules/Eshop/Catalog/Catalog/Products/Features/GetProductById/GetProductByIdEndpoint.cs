using Catalog.Contracts.Products.Features.GetProductById;
using Tenants.Contracts.Tenants.Dtos;

namespace Catalog.Products.Features.GetProductById;

//public record GetProductByIdRequest(Guid Id);
public record GetProductByIdResponse(ProductDto Product, TenantDto Tenant);

public class GetProductByIdEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/eshop/products/{id}", async (string id, ISender sender) =>
        {
            var result = await sender.Send(new GetProductByIdQuery(id));

            var response = result.Adapt<GetProductByIdResponse>();

            return Results.Ok(response);
        })
        .WithName("GetProductById")
        .Produces<GetProductByIdResponse>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .WithSummary("Get Product By Id")
        .WithDescription("Get Product By Id");
    }
}
