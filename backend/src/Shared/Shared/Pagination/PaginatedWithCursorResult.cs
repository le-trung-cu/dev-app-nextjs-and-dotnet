namespace Shared.Pagination;

public class PaginatedWithCursorResult<TEntity, TCursor>(TCursor? cursor, int pageSize, long count, IEnumerable<TEntity> data)
    where TEntity : class
{
  public TCursor? Cursor { get; } = cursor;
  public int PageSize { get; } = pageSize;
  public long Count { get; } = count;
  public IEnumerable<TEntity> Data { get; } = data;
}