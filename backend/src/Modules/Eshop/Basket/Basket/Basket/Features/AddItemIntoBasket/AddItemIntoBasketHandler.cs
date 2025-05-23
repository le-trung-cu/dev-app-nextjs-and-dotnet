using Basket.Basket.Features.CreateBasket;
using Catalog.Contracts.Products.Features.GetProductById;
using Tenants.Contracts.Tenants.Features;

namespace Basket.Basket.Features.AddItemIntoBasket;

public record AddItemIntoBasketCommand(string TenantId, string UserName, Guid ProductId, int Quantity, string Color)
    : ICommand<AddItemIntoBasketResult>;
public record AddItemIntoBasketResult(Guid Id);
public class AddItemIntoBasketCommandValidator : AbstractValidator<AddItemIntoBasketCommand>
{
  public AddItemIntoBasketCommandValidator()
  {
    RuleFor(x => x.UserName).NotEmpty().WithMessage("UserName is required");
    RuleFor(x => x.ProductId).NotEmpty().WithMessage("ProductId is required");
    RuleFor(x => x.Quantity).GreaterThan(0).WithMessage("Quantity must be greater than 0");
  }
}

internal class AddItemIntoBasketHandler
    (IBasketRepository repository, ISender sender)
    : ICommandHandler<AddItemIntoBasketCommand, AddItemIntoBasketResult>
{
  public async Task<AddItemIntoBasketResult> Handle(AddItemIntoBasketCommand command, CancellationToken cancellationToken)
  {
    var tenant = await sender.Send(new GetTenantByIdQuery(command.TenantId), cancellationToken);
    // Add shopping cart item into shopping cart
    ShoppingCart? shoppingCart;
    try
    {
      shoppingCart = await repository.GetBasket(tenant.Tenant.Id, command.UserName, false, cancellationToken);
    }
    catch (System.Exception)
    {
      await sender.Send(new CreateBasketCommand(
          new ShoppingCartDto(Guid.NewGuid(), tenant.Tenant.Id, command.UserName, [])),
          cancellationToken
          );
      shoppingCart = await repository.GetBasket(tenant.Tenant.Id, command.UserName, false, cancellationToken);
    }

    //TODO: Before AddItem into SC, we should call Catalog Module GetProductById method
    // Get latest product information and set Price and ProductName when adding item into SC

    var result = await sender.Send(
        new GetProductByIdQuery(command.ProductId.ToString()),
        cancellationToken);

    shoppingCart.AddItem(
            command.ProductId,
            command.Quantity,
            command.Color,
            result.Product.Price,
            result.Product.Name);
    //command.ShoppingCartItem.Price,
    //command.ShoppingCartItem.ProductName);

    await repository.SaveChangesAsync(tenant.Tenant.Id, command.UserName, cancellationToken);

    return new AddItemIntoBasketResult(shoppingCart.Id);
  }
}
