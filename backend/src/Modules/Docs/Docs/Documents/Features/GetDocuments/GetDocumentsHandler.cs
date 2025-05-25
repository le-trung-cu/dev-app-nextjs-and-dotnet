using System.Security.Claims;
using Docs.Documents.Dtos;
using Docs.Documents.Models;
using Mapster;
using Shared.Contracts.CQRS;
using Shared.Extensions;

namespace Docs.Documents.Features.GetDocuments;


public record GetDocumentsQuery(string? Search, Guid? OrganizationId) : IQuery<GetDocumentsResult>;

public record GetDocumentsResult(bool IsSuccess, IEnumerable<DocumentDto> Documents);
public class GetDocumentsHandler
  (DocumentDbContext dbContext, ClaimsPrincipal user)
  : IQueryHandler<GetDocumentsQuery, GetDocumentsResult>
{
  public async Task<GetDocumentsResult> Handle(GetDocumentsQuery query, CancellationToken cancellationToken)
  {
    var docsQuery = dbContext.Documents.AsNoTracking();

    if (query.OrganizationId.HasValue)
    {
      docsQuery = docsQuery.Where(x => x.OrganizationId == query.OrganizationId);
    }
    if (!string.IsNullOrWhiteSpace(query.Search))
    {
      docsQuery = docsQuery.Where(x => x.Title.Contains(query.Search));
    }

    if (!query.OrganizationId.HasValue && string.IsNullOrWhiteSpace(query.Search))
    {
      docsQuery = docsQuery.Where(x => x.OwnerId == user.GetUserId().ToString());
    }

    var docs = await docsQuery.ToListAsync(cancellationToken);

    return new GetDocumentsResult(true, docs.Adapt<IEnumerable<DocumentDto>>());
  }
}
