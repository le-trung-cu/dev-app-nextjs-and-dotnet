using Shared.Models;

namespace Catalog.Contracts.Products.Dtos;

public record ProductDto(
    Guid Id,
    Guid TenantId,
    string Name,
    List<CategoryDto> Categories,
    string Description,
    decimal Price,
    Guid? ImageId,
    Guid? CoverId,
    Media? Image,
    Media? Cover,
    DateTime CreatedAt,
    DateTime LastModified
    );
