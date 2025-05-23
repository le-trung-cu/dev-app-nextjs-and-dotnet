using EshopMedias.Contracts.Medias.Features.CreateMedia;

namespace Catalog.Products.Features.UpdateProduct;

public record UpdateProductCommand(
  Guid Id,
  Guid TenantId,
  string Name,
  List<Guid> Categories,
  string Description,
  decimal Price,
  Guid? ImageId,
  Guid? CoverId)
  : ICommand<UpdateProductResult>;

public record UpdateProductResult(bool IsSuccess);
public class UpdateProductCommandValidator : AbstractValidator<UpdateProductCommand>
{
  public UpdateProductCommandValidator()
  {
    RuleFor(x => x.Id).NotEmpty().WithMessage("Id is required");
    RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required");
    RuleFor(x => x.Price).GreaterThan(0).WithMessage("Price must be greater than 0");
  }
}

internal class UpdateProductHandler(CatalogDbContext dbContext, ISender sender)
    : ICommandHandler<UpdateProductCommand, UpdateProductResult>
{
  public async Task<UpdateProductResult> Handle(UpdateProductCommand command, CancellationToken cancellationToken)
  {
    //Update Product entity from command object
    //save to database
    //return result

    var product = await dbContext.Products
      .Where(x => x.Id == command.Id)
      .Include(x => x.Categories)
      .FirstOrDefaultAsync(cancellationToken);
      
    var categories = await dbContext.Categories
      .Where(x => command.Categories.Contains(x.Id))
      .ToListAsync(cancellationToken);
    if (product is null)
    {
      throw new ProductNotFoundException(command.Id);
    }


    Guid? imageId = command.ImageId;
    Guid? coverId = command.CoverId;

    product.Update(
        command.Name,
        categories,
        command.Description,
        command.Price,
        imageId,
        coverId);

    dbContext.Products.Update(product);
    await dbContext.SaveChangesAsync(cancellationToken);

    return new UpdateProductResult(true);
  }
}
