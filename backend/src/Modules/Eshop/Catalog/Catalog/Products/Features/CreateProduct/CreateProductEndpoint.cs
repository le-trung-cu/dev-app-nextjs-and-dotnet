namespace Catalog.Products.Features.CreateProduct;

public record CreateProductRequest(
  Guid Id,
  Guid TenantId,
  string Name,
  List<Guid> Categories,
  string Description,
  string ImageFile,
  decimal Price
);

public record CreateProductResponse(Guid Id);

public class CreateProductEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/eshop/products", async (CreateProductRequest request, ISender sender) =>
    {
      var command = request.Adapt<CreateProductCommand>();

      var result = await sender.Send(command);

      var response = result.Adapt<CreateProductResponse>();

      return Results.Created($"/api/eshop/products/{response.Id}", response);
    })
    .WithName("CreateProduct")
    .Produces<CreateProductResponse>(StatusCodes.Status201Created)
    .ProducesProblem(StatusCodes.Status400BadRequest)
    .WithSummary("Create Product")
    .WithDescription("Create Product");
  }
}
