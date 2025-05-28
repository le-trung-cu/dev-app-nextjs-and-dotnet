namespace Docs.Documents.Dtos;

public record DocumentDto(Guid Id, string Title, string? InitialContent, string? OwnerId, Guid? RoomI, Guid? OrganizationId, DateTime CreatedAt, DateTime LastModified);

public record DocumentItemDto(Guid Id, string Title);
