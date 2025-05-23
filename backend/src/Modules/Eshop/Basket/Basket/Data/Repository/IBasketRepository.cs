namespace Basket.Data.Repository;
public interface IBasketRepository
{
    Task<ShoppingCart> GetBasket(Guid tenantId, string userName, bool asNoTracking = true, CancellationToken cancellationToken = default);
    Task<ShoppingCart> CreateBasket(ShoppingCart basket, CancellationToken cancellationToken = default);
    Task<bool> DeleteBasket(Guid tenantId,string userName, CancellationToken cancellationToken = default);
    Task<int> SaveChangesAsync(Guid tenantId, string? userName = null, CancellationToken cancellationToken = default);
}
