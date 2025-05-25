using System;

namespace Docs.Documents.Features.GetDocumentById;

public class GetDocumentByIdEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/docs/documents/{documentId}", async (Guid documentId, ISender sender) =>
    {
      var result = await sender.Send(new GetDocumentByIdQuery(documentId));
      return result;
    }).RequireAuthorization();
  }
}
