using Basket.Data.JsonConverters;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Basket.Data.Repository;
public class CachedBasketRepository
    (IBasketRepository repository, IDistributedCache cache)
    : IBasketRepository
{
    private readonly JsonSerializerOptions _options = new JsonSerializerOptions
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        Converters = { new ShoppingCartConverter(), new ShoppingCartItemConverter() }
    };

    public async Task<ShoppingCart> GetBasket(Guid tenantId,string userName, bool asNoTracking = true, CancellationToken cancellationToken = default)
    {
        if (!asNoTracking)
        {
            return await repository.GetBasket(tenantId, userName, false, cancellationToken);
        }

        var cachedBasket = await cache.GetStringAsync(tenantId.ToString() + userName, cancellationToken);
        if (!string.IsNullOrEmpty(cachedBasket))
        {            
            return JsonSerializer.Deserialize<ShoppingCart>(cachedBasket, _options)!;
        }            

        var basket = await repository.GetBasket(tenantId, userName, asNoTracking, cancellationToken);
        
        await cache.SetStringAsync(userName, JsonSerializer.Serialize(basket, _options), cancellationToken);
        
        return basket;
    }

    public async Task<ShoppingCart> CreateBasket(ShoppingCart basket, CancellationToken cancellationToken = default)
    {
        await repository.CreateBasket(basket, cancellationToken);

        await cache.SetStringAsync(basket.UserName, JsonSerializer.Serialize(basket, _options), cancellationToken);

        return basket;
    }

    public async Task<bool> DeleteBasket(Guid tenantId, string userName, CancellationToken cancellationToken = default)
    {
        await repository.DeleteBasket(tenantId, userName, cancellationToken);

        await cache.RemoveAsync(userName, cancellationToken);

        return true;
    }    

    public async Task<int> SaveChangesAsync(Guid tenantId,string? userName = null, CancellationToken cancellationToken = default)
    {
        var result = await repository.SaveChangesAsync(tenantId, userName, cancellationToken);
        
        if (userName is not null)
        {
            await cache.RemoveAsync(userName, cancellationToken);
        }

        return result;
    }
}
