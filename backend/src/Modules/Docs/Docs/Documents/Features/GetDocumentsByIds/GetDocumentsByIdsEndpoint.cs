using System;

namespace Docs.Documents.Features.GetDocumentsByIds;

public class GetDocumentsByIdsEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPut("/api/docs/documents/documents-ids",
    async (GetDocumentsByIdsQuery request, ISender sender) =>
    {
      var result = await sender.Send(request);
      return result;
    })
    .RequireAuthorization();
  }
}
