namespace Catalog.Products.Features.GetProducts;

public class AdminGetProductsEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/eshop/admin/products", async ([AsParameters] AdminGetProductsQuery request, ISender sender) =>
    {
      var result = await sender.Send(request);

      return Results.Ok(result);
    })
    .WithName("AdminGetProducts")
    .ProducesProblem(StatusCodes.Status400BadRequest)
    .WithSummary("Admin Get Products")
    .WithDescription("Admin Get Products");
  }
}
