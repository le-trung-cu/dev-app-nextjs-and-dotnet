using EshopMedias.Contracts.Medias.Features.CreateMedia;
using Tenants.Contracts.Tenants.Features;

namespace Catalog.Products.Features.CreateProduct;

public record CreateProductCommand(
  Guid TenantId,
  string Name,
  List<Guid> Categories,
  string Description,
  decimal Price,
  Guid? ImageId,
  Guid? CoverId,
  IFormFile? ImageFile,
  IFormFile? CoverFile)
  : ICommand<CreateProductResult>;

public record CreateProductResult(Guid Id);
public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
{
  public CreateProductCommandValidator()
  {
    RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required");
    RuleFor(x => x.Categories).NotEmpty().WithMessage("Category is required");
    RuleFor(x => x.ImageFile).NotEmpty().WithMessage("ImageFile is required");
    RuleFor(x => x.Price).GreaterThan(0).WithMessage("Price must be greater than 0");
  }
}

internal class CreateProductHandler
    (CatalogDbContext dbContext, ClaimsPrincipal user, ISender sender)
    : ICommandHandler<CreateProductCommand, CreateProductResult>
{
  public async Task<CreateProductResult> Handle(CreateProductCommand command,
      CancellationToken cancellationToken)
  {
    //create Product entity from command object
    //save to database
    //return result
    var userId = user.GetUserId();
    var member = await sender.Send(new GetMemberQuery(command.TenantId, userId), cancellationToken);

    var categories = await dbContext.Categories
      .Where(x => command.Categories.Contains(x.Id))
      .ToListAsync(cancellationToken);
      
    var product = CreateNewProduct(command, categories);

    dbContext.Products.Add(product);
    await dbContext.SaveChangesAsync(cancellationToken);

    return new CreateProductResult(product.Id);
  }

  private Product CreateNewProduct(CreateProductCommand productDto, List<Category> categories)
  {
    var product = Product.Create(
        Guid.NewGuid(),
        productDto.TenantId,
        productDto.Name,
        categories,
        productDto.Description,
        productDto.Price,
        productDto.ImageId,
        productDto.CoverId
        );

    return product;
  }
}
