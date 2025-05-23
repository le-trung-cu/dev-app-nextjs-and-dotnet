using Shared.Exceptions;

namespace Catalog.Products.Exceptions;
public class ProductNotFoundException : NotFoundException
{
    public ProductNotFoundException(string id) 
        : base("Product", id)
    {
    }

    public ProductNotFoundException(Guid id) 
        : base("Product", id)
    {
    }
}
