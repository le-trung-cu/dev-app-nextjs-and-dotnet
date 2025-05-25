

namespace Docs.Documents.Features.CreateDocument;

public class CreateDocumentEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/docs/documents", async (CreateDocumentCommand request, ISender sender) =>
    {
      var result = await sender.Send(request);
      return result;
    });
  }
}
