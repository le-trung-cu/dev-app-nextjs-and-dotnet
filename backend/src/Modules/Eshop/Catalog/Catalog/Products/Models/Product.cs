using Catalog.Categories.Models;

namespace Catalog.Products.Models;

public class Product : Aggregate<Guid>
{
  public string Name { get; private set; } = default!;
  public List<Category> Categories { get; private set; } = [];
  public string Description { get; private set; } = default!;
}
