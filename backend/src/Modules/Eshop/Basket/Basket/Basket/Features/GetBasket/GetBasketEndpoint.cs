namespace Basket.Basket.Features.GetBasket;

//public record GetBasketRequest(string UserName); 
public record GetBasketResponse(ShoppingCartDto ShoppingCart);

public class GetBasketEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/eshop/tenants/{tenantId}/basket/{userName}", async (string tenantId, string userName, ISender sender) =>
        {
            var result = await sender.Send(new GetBasketQuery(tenantId, userName));

            var response = result.Adapt<GetBasketResponse>();

            return Results.Ok(response);
        })
        .Produces<GetBasketResponse>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .WithSummary("Get Basket")
        .WithDescription("Get Basket")
        .RequireAuthorization();
    }
}
