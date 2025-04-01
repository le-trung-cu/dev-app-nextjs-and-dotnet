
namespace JiraTaskManager.Workspaces.Features.GetProjectsByWorkspaceId;


public record GetProjectsByWorkspaceIdQuery(Guid WorkspaceId) : IQuery<GetProjectsByWorkspaceIdResult>;

public record GetProjectsByWorkspaceIdResult(bool IsSuccess, IEnumerable<ProjectDto> Projects);

public class GetProjectsByWorkspaceIdHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user) : IQueryHandler<GetProjectsByWorkspaceIdQuery, GetProjectsByWorkspaceIdResult>
{
  public async Task<GetProjectsByWorkspaceIdResult> Handle(GetProjectsByWorkspaceIdQuery query, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var workspace = await dbContext.Workspaces
      .AsNoTracking()
      .Where(x => x.Id == query.WorkspaceId)
      .Include(x => x.Members.Where(t => t.UserId == userId))
      .Include(x => x.Projects)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(query.WorkspaceId);

    if (!workspace.Members.Any())
    {
      throw new MemberNotFoundException(query.WorkspaceId, userId);
    }

    return new GetProjectsByWorkspaceIdResult(true, workspace.Projects.Adapt<IEnumerable<ProjectDto>>());
  }
}
