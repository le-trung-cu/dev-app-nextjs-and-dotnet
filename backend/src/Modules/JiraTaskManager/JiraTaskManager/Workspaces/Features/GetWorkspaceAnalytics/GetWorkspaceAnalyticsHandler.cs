
namespace JiraTaskManager.Workspaces.Features.GetWorkspaceAnalytics;

public record WorkspaceAnalyticsDto(
  Guid Id,
  string Name,
  int TotalProjects,
  int TotalTasks,
  int TotalAssignedTasks,
  int TotalCompletedTasks,
  int TotalOverdueTasks
);

public record GetWorkspaceAnalyticsCommand(Guid WorkspaceId)
  : IQuery<GetWorkspaceAnalyticsResult>;

public record GetWorkspaceAnalyticsResult(bool IsSuccess, WorkspaceAnalyticsDto WorkspaceAnalytics);


public class GetWorkspaceAnalyticsHandler
  (WorkspaceDbContext context, ClaimsPrincipal user)
  : IQueryHandler<GetWorkspaceAnalyticsCommand, GetWorkspaceAnalyticsResult>
{
  public async Task<GetWorkspaceAnalyticsResult> Handle(GetWorkspaceAnalyticsCommand query, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var member = await context.Members
      .AsNoTracking()
      .FirstOrDefaultAsync(x => x.WorkspaceId == query.WorkspaceId && x.UserId == userId, cancellationToken)
      ?? throw new BadRequestException("Unauthorized");

    var workspaceName = await context.Workspaces
      .Where(x => x.Id == query.WorkspaceId)
      .Select(x => x.Name)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(query.WorkspaceId);

    var workspaceAnalytics = await context.Workspaces
      .Where(x => x.Id == query.WorkspaceId)
      .Select(x => new WorkspaceAnalyticsDto(
        x.Id,//WorkspaceId:
        x.Name,
        1, //TotalProjects:
        x.Tasks.Count, //TotalTasks: 
        x.Tasks.Count(t => t.AssigneeId == member.Id), //TotalAssignedTasks: 
        x.Tasks.Count(t => t.Status == TaskItemStatus.Done), //TotalCompletedTasks:
        x.Tasks.Count(t => t.EndDate < DateTime.UtcNow) //TotalOverdueTasks: 
      )).FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(query.WorkspaceId);

    return new GetWorkspaceAnalyticsResult(true, workspaceAnalytics);
  }
}
