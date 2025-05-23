namespace Catalog.Contracts.Products.Dtos;

public class CategoryDto
{
  public Guid Id { get; set; }
  public string Name { get; set; } = default!;
  public string Slug { get; set; } = default!;

  public List<CategoryDto> Subcategories { get; set; } = [];
}
