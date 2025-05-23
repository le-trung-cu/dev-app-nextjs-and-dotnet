namespace Catalog.Products.Features.GetCategory;

public record GetCategoryBySlugQuery(string Slug) : IQuery<GetCategoryBySlugResult>;

public record GetCategoryBySlugResult(bool IsSuccess, CategoryDto Category);

public class GetCategoryBySlugHandler
  (CatalogDbContext dbContext)
  : IQueryHandler<GetCategoryBySlugQuery, GetCategoryBySlugResult>
{
  public async Task<GetCategoryBySlugResult> Handle(GetCategoryBySlugQuery query, CancellationToken cancellationToken)
  {
    var category = await dbContext.Categories.FirstOrDefaultAsync(x => x.Slug == query.Slug, cancellationToken)
      ?? throw new CategoryNotFoundException(query.Slug);

    return new GetCategoryBySlugResult(true, category.Adapt<CategoryDto>());
  }
}
