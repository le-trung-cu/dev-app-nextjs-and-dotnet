
using System.Linq.Expressions;

namespace JiraTaskManager.Workspaces.Features.GetWorkspaceAnalytics;

public record WorkspaceAnalyticsDto
{
  public Guid Id { get; set; }
  public string Name { get; set; }
  public int TotalProjects { get; set; }
  public int TotalTasks => ThisMonthTasks;
  public int TotalAssignedTasks => ThisMonthAssignedTasks;
  public int TotalCompletedTasks => ThisMonthCompletedTasks;
  public int TotalOverdueTask => ThisMonthOverdueTasks;
  public int ThisMonthTasks { get; set; }
  public int LastMonthTasks { get; set; }
  public int ThisMonthAssignedTasks { get; set; }
  public int LastMonthAssignedTasks { get; set; }
  public int ThisMonthIncompleteTasks { get; set; }
  public int LastMonthIncompleteTasks { get; set; }
  public int ThisMonthCompletedTasks { get; set; }
  public int LastMonthCompletedTasks { get; set; }
  public int ThisMonthOverdueTasks { get; set; }
  public int LastMonthOverdueTasks { get; set; }
  public int TaskDifference => ThisMonthTasks - LastMonthTasks;
  public int AssignedTaskDifference => ThisMonthAssignedTasks - LastMonthAssignedTasks;
  public int CompletedTaskDifference => ThisMonthCompletedTasks - LastMonthCompletedTasks;
  public int OverdueTaskDifference => ThisMonthOverdueTasks - LastMonthOverdueTasks;
  public int IncompleteTaskDifference => ThisMonthIncompleteTasks - LastMonthIncompleteTasks;
}

public record GetWorkspaceAnalyticsCommand(Guid WorkspaceId)
  : IQuery<GetWorkspaceAnalyticsResult>;

public record GetWorkspaceAnalyticsResult(bool IsSuccess, WorkspaceAnalyticsDto WorkspaceAnalytics);


public class GetWorkspaceAnalyticsHandler
  : IQueryHandler<GetWorkspaceAnalyticsCommand, GetWorkspaceAnalyticsResult>
{
  private readonly WorkspaceDbContext context;
  private readonly ClaimsPrincipal user;
  private readonly DateTime thisMonthStart;
  private readonly DateTime thisMonthEnd;
  private readonly DateTime lastMonthStart;
  private readonly DateTime lastMonthEnd;
  private readonly DateTime now;

  public GetWorkspaceAnalyticsHandler(WorkspaceDbContext context, ClaimsPrincipal user)
  {
    this.context = context;
    this.user = user;
    this.now = DateTime.UtcNow;
    thisMonthStart = new DateTime(now.Year, now.Month, 1).ToUniversalTime();
    thisMonthEnd = new DateTime(now.Year, now.Month, DateTime.DaysInMonth(now.Year, now.Month), 23, 59, 59).ToUniversalTime();

    DateTime lastMonth = now.AddMonths(-1);
    lastMonthStart = new DateTime(lastMonth.Year, lastMonth.Month, 1).ToUniversalTime();
    lastMonthEnd = new DateTime(lastMonth.Year, lastMonth.Month, DateTime.DaysInMonth(lastMonth.Year, lastMonth.Month), 23, 29, 59).ToUniversalTime();
  }

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
      .AsNoTracking()
      .Where(x => x.Id == query.WorkspaceId)
      .Select(x => new WorkspaceAnalyticsDto
      {
        Id = x.Id,
        Name = x.Name,
        TotalProjects = x.Projects.Count,
        ThisMonthTasks = x.Tasks.AsQueryable().Where(InDateRange(thisMonthStart, thisMonthEnd)).Count(),
        LastMonthTasks = x.Tasks.AsQueryable().Where(InDateRange(lastMonthStart, lastMonthEnd)).Count(),
        ThisMonthAssignedTasks = x.Tasks.AsQueryable().Where(InDateRange(thisMonthStart, thisMonthEnd)).Where(t => t.AssigneeId == member.Id).Count(),
        LastMonthAssignedTasks = x.Tasks.AsQueryable().Where(InDateRange(lastMonthStart, lastMonthEnd)).Where(t => t.AssigneeId == member.Id).Count(),
        ThisMonthIncompleteTasks = x.Tasks.AsQueryable().Where(InDateRange(thisMonthStart, thisMonthEnd)).Where(t => t.Status != TaskItemStatus.Done).Count(),
        LastMonthIncompleteTasks = x.Tasks.AsQueryable().Where(InDateRange(lastMonthStart, lastMonthEnd)).Where(t => t.Status != TaskItemStatus.Done).Count(),
        ThisMonthCompletedTasks = x.Tasks.AsQueryable().Where(InDateRange(thisMonthStart, thisMonthEnd)).Where(t => t.Status == TaskItemStatus.Done).Count(),
        LastMonthCompletedTasks = x.Tasks.AsQueryable().Where(InDateRange(lastMonthStart, lastMonthEnd)).Where(t => t.Status == TaskItemStatus.Done).Count(),
        ThisMonthOverdueTasks = x.Tasks.AsQueryable().Where(InDateRange(thisMonthStart, thisMonthEnd)).Where(t => t.Status !=  TaskItemStatus.Done).Where(t => t.EndDate < now).Count(),
        LastMonthOverdueTasks = x.Tasks.AsQueryable().Where(InDateRange(lastMonthStart, lastMonthEnd)).Where(t => t.Status != TaskItemStatus.Done).Where(t=> t.EndDate < now).Count(),
      }).FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(query.WorkspaceId);

    return new GetWorkspaceAnalyticsResult(true, workspaceAnalytics);
  }

  private static DateTime GetLastMomentOfMonth(int year, int month)
  {
    // Get last day in month
    int lastDay = DateTime.DaysInMonth(year, month);

    // Create DateTime at 23:59:59
    DateTime lastMomentOfMonth = new(year, month, lastDay, 23, 59, 59);
    return lastMomentOfMonth;
  }

  public static Expression<Func<TaskItem, bool>> InDateRange(DateTime start, DateTime end) => t => t.CreatedAt >= start && t.CreatedAt <= end;
}
