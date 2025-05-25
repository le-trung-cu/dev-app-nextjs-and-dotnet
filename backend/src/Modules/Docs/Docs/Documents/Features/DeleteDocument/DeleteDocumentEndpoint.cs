
namespace Docs.Documents.Features.DeleteDocument;

public class DeleteDocumentEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapDelete("/api/docs/documents/{documentId}", async (Guid documentId, ISender sender) =>
    {
      var result = await sender.Send(new DeleteDocumentCommand(documentId));
      return result;
    })
    .RequireAuthorization();
  }
}
