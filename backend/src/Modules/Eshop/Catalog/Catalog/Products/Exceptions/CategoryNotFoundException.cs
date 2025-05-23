using System;

namespace Catalog.Products.Exceptions;

public class CategoryNotFoundException : NotFoundException
{
  public CategoryNotFoundException(Guid id)
      : base("Category", id)
  {
  }

  public CategoryNotFoundException(string slug)
      : base("Category", slug)
  {
  }
}