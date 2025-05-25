using Microsoft.AspNetCore.Http;
using Shared.Pagination;

namespace Docs.Documents.Features.GetDocuments;

public record GetDocumentsRequest : PaginationRequest
{
  public string? Search { get; set; }
  public Guid? OrganizationId { get; set; }
}

public class GetDocumentsEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/docs/documents", async ([AsParameters] GetDocumentsQuery request, ISender sender) =>
    {
      var result = await sender.Send(request);
      return result;
    });
  }
}
