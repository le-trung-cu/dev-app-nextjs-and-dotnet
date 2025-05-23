namespace Catalog.Products.Models;

public class ProductCategory : Entity<Guid>
{
  public Guid ProductId { get; set; }
  public Guid CategoryId { get; set; }
}
