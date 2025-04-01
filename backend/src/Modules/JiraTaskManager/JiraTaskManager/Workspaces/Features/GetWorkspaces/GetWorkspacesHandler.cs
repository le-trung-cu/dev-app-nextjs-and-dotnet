namespace JiraTaskManager.Workspaces.Features.GetWorkspaces;

public record GetWorkspacesQuery()
  : IQuery<GetWorkspacesResult>;

public record GetWorkspacesResult(bool IsSuccess, IEnumerable<WorkspaceItemDto> Workspaces);

public class GetWorkspacesHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user)
  : IQueryHandler<GetWorkspacesQuery, GetWorkspacesResult>
{
  public async Task<GetWorkspacesResult> Handle(GetWorkspacesQuery request, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var workspaceIds = await dbContext.Members
      .AsNoTracking()
      .Where(x => x.UserId == userId)
      .Select(x => x.WorkspaceId)
      .ToListAsync(cancellationToken);

    var workspaces = await dbContext.Workspaces
      .AsNoTracking()
      .Where(x => workspaceIds.Contains(x.Id))
      .ToListAsync(cancellationToken);

    return new GetWorkspacesResult(true, workspaces.Adapt<IEnumerable<WorkspaceItemDto>>());
  }
}
