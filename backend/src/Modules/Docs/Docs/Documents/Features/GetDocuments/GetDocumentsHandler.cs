using System.Security.Claims;
using Docs.Documents.Dtos;
using Docs.Documents.Models;
using Mapster;
using Shared.Contracts.CQRS;
using Shared.Extensions;
using Shared.Pagination;

namespace Docs.Documents.Features.GetDocuments;


public record GetDocumentsQuery : PaginationRequest, IQuery<GetDocumentsResult>
{
  public string? Search { get; set; }
  public Guid? OrganizationId { get; set; }
}

public record GetDocumentsResult(bool IsSuccess, PaginatedResult<DocumentDto> Documents);

public class GetDocumentsHandler
  (DocumentDbContext dbContext, ClaimsPrincipal user)
  : IQueryHandler<GetDocumentsQuery, GetDocumentsResult>
{
  public async Task<GetDocumentsResult> Handle(GetDocumentsQuery query, CancellationToken cancellationToken)
  {
    var docsQuery = dbContext.Documents.AsNoTracking();
    var organizationId = user.GetAppDocsOrganizationId();
    if (organizationId.HasValue)
    {
      docsQuery = docsQuery.Where(x => x.OrganizationId == organizationId);
    }
    if (!string.IsNullOrWhiteSpace(query.Search))
    {
      docsQuery = docsQuery.Where(x => x.Title.Contains(query.Search));
    }

    if (!organizationId.HasValue && string.IsNullOrWhiteSpace(query.Search))
    {
      docsQuery = docsQuery.Where(x => x.OwnerId == user.GetUserId().ToString());
    }
    var count = await docsQuery.LongCountAsync(cancellationToken);

    var docs = await docsQuery
      .Skip((query.PageIndex - 1) * query.PageSize)
      .Take(query.PageSize)
      .ToListAsync(cancellationToken);

    return new GetDocumentsResult
    (
      IsSuccess: true,
      Documents: new(query.PageIndex, query.PageSize, count, docs.Adapt<IEnumerable<DocumentDto>>())
    );
  }
}
