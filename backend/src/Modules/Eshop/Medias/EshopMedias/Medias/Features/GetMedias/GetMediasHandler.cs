
using Microsoft.EntityFrameworkCore;
using Shared.Pagination;

namespace EshopMedias.Medias.Features.GetMedias;

public record GetMediasQuery(string TenantId, PaginationRequest Pagination) : IQuery<GetMediasResult>;
public record GetMediasResult(bool IsSuccess, IEnumerable<Media> Medias);
public class GetMediasHandler
  (MediaDbContext dbContext) : IQueryHandler<GetMediasQuery, GetMediasResult>
{
  public async Task<GetMediasResult> Handle(GetMediasQuery query, CancellationToken cancellationToken)
  {
    var medias = await dbContext.Medias.AsNoTracking()
      .OrderBy(x => x.Name)
      .Skip(query.Pagination.PageSize * (query.Pagination.PageIndex - 1))
      .Take(query.Pagination.PageSize)
      .ToListAsync(cancellationToken);

    return new GetMediasResult(true, medias);
  }
}
