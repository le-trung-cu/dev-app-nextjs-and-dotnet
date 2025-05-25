namespace Shared.Pagination;

public record PaginationRequest
{
  public int PageIndex { get; set; } = 1;
  public int PageSize { get; set; } = 10;
}
