using System;
using Docs.Documents.Dtos;
using Mapster;

namespace Docs.Documents.Features.GetDocumentsByIds;

public record GetDocumentsByIdsQuery(IEnumerable<Guid> DocumentIds)
  : IQuery<GetDocumentsByIdsResult>;

public record GetDocumentsByIdsResult(bool IsSuccess, Dictionary<Guid, string> Documents);

public class GetDocumentsByIdsHandler
  (DocumentDbContext dbContext) : IQueryHandler<GetDocumentsByIdsQuery, GetDocumentsByIdsResult>
{
  public async Task<GetDocumentsByIdsResult> Handle(GetDocumentsByIdsQuery query, CancellationToken cancellationToken)
  {
    var documents = await dbContext.Documents.AsNoTracking()
      .Where(x => query.DocumentIds.Contains(x.Id))
      .ToDictionaryAsync(x => x.Id, x => x.Title, cancellationToken)
      ?? [];

    foreach (var item in query.DocumentIds)
    {
      documents.TryAdd(item, "[Removed]");
    }

    return new GetDocumentsByIdsResult(true, documents);
  }
}
