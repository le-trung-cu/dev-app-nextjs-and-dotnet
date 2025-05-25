using System;

namespace Docs.Documents.Features.UpdateDocument;

public record UpdateDocumentRequest(string Title);

public class UpdateDocumentEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPut("/api/docs/documents/{documentId}", async (Guid documentId, UpdateDocumentRequest request, ISender sender) =>
    {
      var result = await sender.Send(new UpdateDocumentCommand(documentId, request.Title));
      return result;
    }).RequireAuthorization();
  }
}
