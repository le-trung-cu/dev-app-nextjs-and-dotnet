namespace Catalog.Products.Features.GetCategories;

public class GetCategoriesEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/eshop/categories", async (ISender sender) => {
      var result = await sender.Send(new GetCategoriesQuery());
      return result;
    });
  }
}
