using Shared.DDD;

namespace Docs.Documents.Models;

public class Document : Entity<Guid>
{
  public string Title { get; set; } = default!;
  public string? InitialContent { get; set; }
  public string? OwnerId { get; set; }
  public Guid? RoomId { get; set; }
  public Guid? OrganizationId { get; set; }

  static public Document Create(string title, string? ownerId, string? initialContent = null, Guid? roomId = null, Guid? organizationId = null)
  {
    var document = new Document
    {
      Title = title,
      InitialContent = initialContent,
      OwnerId = ownerId,
      RoomId = roomId,
      OrganizationId = organizationId,
    };

    return document;
  }

  public void Rename(string newName)
  {
    Title = newName;
  }
}
