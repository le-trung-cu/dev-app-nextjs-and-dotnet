using System;

namespace Catalog.Products.Features.GetCategories;

public record GetCategoriesQuery():IQuery<GetCategoriesResult>;

public record GetCategoriesResult(bool IsSuccess, IEnumerable<CategoryDto> Categories);

public class GetCategoriesHandler
  (CatalogDbContext dbContext)
  : IQueryHandler<GetCategoriesQuery, GetCategoriesResult>
{
  public async Task<GetCategoriesResult> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
  {
    var categories = await GetCategoryTree(cancellationToken);
    return new  GetCategoriesResult(true, categories.Adapt<IEnumerable<CategoryDto>>());
  }

  private async Task<List<Category>> GetCategoryTree(CancellationToken cancellationToken)
  {
    var allCategories = await dbContext.Categories
      .AsNoTracking()
      .OrderBy(x => x.CreatedAt)
      .ToListAsync(cancellationToken);

    return allCategories
      .Where(x => x.ParentCategoryId == null)
      .Select(x => BuildTree(x, allCategories))
      .ToList();
  }

  private Category BuildTree(Category root, List<Category> allCategories)
  {
    root.Subcategories = allCategories
      .Where(x => x.ParentCategoryId.Equals(root.Id))
      .Select(x => BuildTree(x, allCategories))
      .ToList();
    return root;
  }
}
