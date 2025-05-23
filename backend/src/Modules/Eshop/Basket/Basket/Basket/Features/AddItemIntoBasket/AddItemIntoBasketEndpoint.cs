namespace Basket.Basket.Features.AddItemIntoBasket;

public record AddItemIntoBasketRequest( Guid ProductId, int Quantity, string Color);
public record AddItemIntoBasketResponse(Guid Id);

public class AddItemIntoBasketEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/eshop/tenants/{tenantId}/basket/{userName}/items",
        async ([FromRoute] string tenantId,
          [FromRoute] string userName,
          [FromBody] AddItemIntoBasketRequest request,
          ISender sender) =>
        {
          var command = new AddItemIntoBasketCommand(tenantId, userName, request.ProductId, request.Quantity, request.Color);

          var result = await sender.Send(command);

          var response = result.Adapt<AddItemIntoBasketResponse>();

          return Results.Created($"/api/eshop/basket/{response.Id}", response);
        })
    .Produces<AddItemIntoBasketResponse>(StatusCodes.Status201Created)
    .ProducesProblem(StatusCodes.Status400BadRequest)
    .WithSummary("Add Item Into Basket")
    .WithDescription("Add Item Into Basket")
    .RequireAuthorization();
  }
}
