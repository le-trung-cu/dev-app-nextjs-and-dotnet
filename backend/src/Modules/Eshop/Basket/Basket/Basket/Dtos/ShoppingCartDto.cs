namespace Basket.Basket.Dtos;
public record ShoppingCartDto(
    Guid Id,
    Guid TenantId,
    string UserName,
    List<ShoppingCartItemDto> Items
    );
