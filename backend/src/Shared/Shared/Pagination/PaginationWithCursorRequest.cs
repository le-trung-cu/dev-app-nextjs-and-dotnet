namespace Shared.Pagination;

public record PaginationWithCursorRequest<TCursor>(TCursor? Cursor=default, int? PageIndex = default, int PageSize=0);
