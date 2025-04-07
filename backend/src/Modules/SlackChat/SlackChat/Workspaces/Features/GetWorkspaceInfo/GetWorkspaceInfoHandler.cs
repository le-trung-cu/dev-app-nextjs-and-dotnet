
namespace SlackChat.Workspaces.Features.GetWorkspaceInfo;


public record GetWorkspaceInfoCommand (Guid WorkspaceId)
  : IQuery<GetWorkspaceInfoResult>;

public record GetWorkspaceInfoResult(bool IsSuccess, WorkspaceInfoDto Workspace);

public class GetWorkspaceInfoHandler
  (WorkspaceDbContext dbContext)
  : IQueryHandler<GetWorkspaceInfoCommand, GetWorkspaceInfoResult>
{
  public async Task<GetWorkspaceInfoResult> Handle(GetWorkspaceInfoCommand query, CancellationToken cancellationToken)
  {
    var workspace = await dbContext.Workspaces.AsNoTracking()
      .Where(x => x.Id == query.WorkspaceId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(query.WorkspaceId);

    return new GetWorkspaceInfoResult(true, workspace.Adapt<WorkspaceInfoDto>());
  }
}
