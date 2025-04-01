namespace JiraTaskManager.Workspaces.Features.GetWorkspaceById;

public record GetWorkspaceByIdQuery(Guid WorkspaceId)
  : IQuery<GetWorkspaceByIdResult>;

public record GetWorkspaceByIdResult(bool IsSuccess, IEnumerable<WorkspaceItemDto> Workspaces);

public class GetWorkspaceByIdHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user)
  : IQueryHandler<GetWorkspaceByIdQuery, GetWorkspaceByIdResult>
{
  public async Task<GetWorkspaceByIdResult> Handle(GetWorkspaceByIdQuery query, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var workspace = await dbContext.Workspaces
      .AsNoTracking()
      .Where(x => x.Id == query.WorkspaceId)
      .Include(x => x.Members)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(query.WorkspaceId);

    if (!workspace.Members.Any())
    {
      throw new MemberNotFoundException(query.WorkspaceId, userId);
    }

    return new GetWorkspaceByIdResult(true, workspace.Adapt<IEnumerable<WorkspaceItemDto>>());
  }
}
