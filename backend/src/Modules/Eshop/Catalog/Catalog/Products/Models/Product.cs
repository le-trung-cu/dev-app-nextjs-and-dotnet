using Catalog.Products.Events;
using Shared.Models;

namespace Catalog.Products.Models;

public class Product : Aggregate<Guid>
{
  public string Name { get; private set; } = default!;
  public List<Category> Categories { get; private set; } = [];
  public string Description { get; private set; } = default!;
  public Media? Image { get; private set; } = default!;
  public Media? Cover { get; private set; } = default!;
  public Guid? ImageId { get; private set; }
  public Guid? CoverId { get; private set; }
  public decimal Price { get; private set; }
  // If checked, this product will not be shown on the public storefront
  public bool IsPrivate { get; set; }
  // If checked, this product will be archived
  public bool IsArchived { get; set; }
  public Guid TenantId { get; private set; }



  public static Product Create(Guid id, Guid tenantId, string name, List<Category> categories, string description, decimal price, Guid? imageId, Guid? coverId)
  {
    ArgumentException.ThrowIfNullOrEmpty(name);
    ArgumentOutOfRangeException.ThrowIfNegativeOrZero(price);

    var product = new Product
    {
      Id = id,
      TenantId = tenantId,
      Name = name,
      Categories = categories,
      Description = description,
      Price = price,
      ImageId = imageId,
      CoverId = coverId,
    };

    product.AddDomainEvent(new ProductCreatedEvent(product));

    return product;
  }

  public void Update(string name, List<Category> categories, string description, decimal price, Guid? imageId, Guid? coverId)
  {
    ArgumentException.ThrowIfNullOrEmpty(name);
    ArgumentOutOfRangeException.ThrowIfNegativeOrZero(price);

    // Update Product entity fields
    Name = name;
    Description = description;
    ImageId = imageId;
    CoverId = coverId;
    Categories = categories;
    // if price has changed, raise ProductPriceChanged domain event
    if (Price != price)
    {
      Price = price;
      AddDomainEvent(new ProductPriceChangedEvent(this));
    }
  }
}
