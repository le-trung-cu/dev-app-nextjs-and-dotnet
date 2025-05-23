using Tenants.Contracts.Tenants.Features;

namespace Basket.Basket.Features.GetBasket;

public record GetBasketQuery(string TenantId, string UserName)
    : IQuery<GetBasketResult>;
public record GetBasketResult(ShoppingCartDto ShoppingCart);

internal class GetBasketHandler(IBasketRepository repository, ISender sender)
    : IQueryHandler<GetBasketQuery, GetBasketResult>
{
    public async Task<GetBasketResult> Handle(GetBasketQuery query, CancellationToken cancellationToken)
    {
        var tenant = await sender.Send(new GetTenantByIdQuery(query.TenantId), cancellationToken);

        // get basket with userName
        var basket = await repository.GetBasket(tenant.Tenant.Id, query.UserName, true, cancellationToken);

        //mapping basket entity to shoppingcartdto
        var basketDto = basket.Adapt<ShoppingCartDto>();

        return new GetBasketResult(basketDto);
    }
}
