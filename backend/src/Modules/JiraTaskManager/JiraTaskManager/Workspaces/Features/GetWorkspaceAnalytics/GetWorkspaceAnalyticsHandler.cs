
using System.Linq;
using System.Linq.Expressions;
using System.Text.Json.Serialization;
using Resend;

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

  public List<TaskTrend> TaskTrends { get; set; } = [];
  public List<TaskPriority> TaskPriorities { get; set; } = [];
  public List<ProjectProductive> ProjectProductives { get; set; } = [];
}

public class TaskTrend
{
  public string Day { get; set; }
  public int Done { get; set; }
  public int InProgress { get; set; }
  public int Todo { get; set; }
}

public class TaskPriority
{
  public Priority Name { get; set; }
  public int Value { get; set; }
  public string Color { get; set; } = default!;
}

public class ProjectProductive
{
  public Guid ProjectId { get; set; }
  public string Name { get; set; } = default!;
  public int Completed { get; set; }
  public int Total { get; set; }
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
  private readonly int Days = 7;

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


    var workspace = await context.Workspaces
      .AsNoTracking()
      .Where(x => x.Id == query.WorkspaceId)
      .Include(x => x.Projects)
      .Include(x => x.Tasks)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(query.WorkspaceId);
    var thisMonthTasks = workspace.Tasks.AsQueryable().Where(x => thisMonthStart <= x.CreatedAt &&  x.CreatedAt <= thisMonthEnd);
    var lastMonthTasks = workspace.Tasks.AsQueryable().Where(x => lastMonthStart <= x.CreatedAt &&  x.CreatedAt <= lastMonthEnd);

    var dict = Enumerable.Range(0, this.Days).Select(i =>
    {
      var date = now.AddDays(-i);
      var key = date.ToString("dd/MM/yyyy");
      var taskTrend = new TaskTrend { Day = key, Done = 0, InProgress = 0, Todo = 0 };
      return (date, taskTrend);
    }).ToDictionary(x => x.taskTrend.Day, x => x);
    
    foreach (var task in workspace.Tasks)
    {

      if (!task.LastModified.HasValue) continue;
      var key = task.LastModified.Value.ToString("dd/MM/yyyy");
      if (dict.TryGetValue(key, out var exist))
      {
        switch (task.Status)
        {
          case TaskItemStatus.InProgress:
            exist.taskTrend.InProgress += 1;
            break;
          case TaskItemStatus.Todo:
            exist.taskTrend.Todo += 1;
            break;
          case TaskItemStatus.Done:
            exist.taskTrend.Done += 1;
            break;
        }
      }
      else
      {
        dict[key] = new(task.LastModified.Value, new TaskTrend { Day = key, Done = 0, InProgress = 0, Todo = 0 });
      }
    }

    var taskTrends = dict.ToList().Select(x => x.Value).OrderBy(x => x.date).Select(x => x.taskTrend).ToList();


    List<TaskPriority> taskPriories = [
      new TaskPriority{Name = Priority.High, Value = 0, Color = "#ef4444"},
      new TaskPriority{Name = Priority.Medium, Value = 0, Color = "#f59e0b"},
      new TaskPriority{Name = Priority.Low, Value = 0, Color = "#6b7280"},
    ];
    foreach (var task in workspace.Tasks)
    {
      switch (task.Priority)
      {
        case Priority.High:
          taskPriories[0].Value += 1;
          break;
        case Priority.Medium:
          taskPriories[1].Value += 1;
          break;
        case Priority.Low:
          taskPriories[2].Value += 1;
          break;
      }
    }

    var projectProductives = workspace.Tasks
      .Where(x => x.ProjectId.HasValue)
      .GroupBy(x => x.ProjectId, (key, x) => new ProjectProductive
      {
        ProjectId = key!.Value,
        Name = workspace.Projects.First(p => p.Id == key).Name,
        Completed = x.Count(t => t.Status == TaskItemStatus.Done),
        Total = x.Count(),
      })
      .OrderByDescending(x => x.Total)
      .ToList();

    var workspaceAnalytics = new WorkspaceAnalyticsDto
    {
      Id = workspace.Id,
      TotalProjects = workspace.Projects.Count,
      ThisMonthTasks = thisMonthTasks.Count(),
      LastMonthTasks = lastMonthTasks.Count(),
      ThisMonthAssignedTasks = thisMonthTasks.Where(t => t.AssigneeId == member.Id).Count(),
      LastMonthAssignedTasks = lastMonthTasks.Where(t => t.AssigneeId == member.Id).Count(),
      ThisMonthIncompleteTasks = thisMonthTasks.Where(t => t.Status != TaskItemStatus.Done).Count(),
      LastMonthIncompleteTasks = lastMonthTasks.Where(t => t.Status != TaskItemStatus.Done).Count(),
      ThisMonthCompletedTasks = thisMonthTasks.Where(t => t.Status == TaskItemStatus.Done).Count(),
      LastMonthCompletedTasks = lastMonthTasks.Where(t => t.Status == TaskItemStatus.Done).Count(),
      ThisMonthOverdueTasks = thisMonthTasks.Where(t => t.Status != TaskItemStatus.Done).Where(t => t.EndDate < now).Count(),
      LastMonthOverdueTasks = lastMonthTasks.Where(t => t.Status != TaskItemStatus.Done).Where(t => t.EndDate < now).Count(),
      TaskTrends = taskTrends,
      TaskPriorities = taskPriories,
      ProjectProductives = projectProductives,
    };


    //  .Select(x => new WorkspaceAnalyticsDto
    //       {
    //         Id = x.Id,
    //         Name = x.Name,
    //         TotalProjects = x.Projects.Count,
    //         ThisMonthTasks = x.Tasks.AsQueryable().Where(InDateRange(thisMonthStart, now)).Count(),
    //         LastMonthTasks = x.Tasks.AsQueryable().Where(InDateRange(lastMonthStart, lastMonthEnd)).Count(),
    //         ThisMonthAssignedTasks = x.Tasks.AsQueryable().Where(InDateRange(thisMonthStart, now)).Where(t => t.AssigneeId == member.Id).Count(),
    //         LastMonthAssignedTasks = x.Tasks.AsQueryable().Where(InDateRange(lastMonthStart, lastMonthEnd)).Where(t => t.AssigneeId == member.Id).Count(),
    //         ThisMonthIncompleteTasks = x.Tasks.AsQueryable().Where(InDateRange(thisMonthStart, now)).Where(t => t.Status != TaskItemStatus.Done).Count(),
    //         LastMonthIncompleteTasks = x.Tasks.AsQueryable().Where(InDateRange(lastMonthStart, lastMonthEnd)).Where(t => t.Status != TaskItemStatus.Done).Count(),
    //         ThisMonthCompletedTasks = x.Tasks.AsQueryable().Where(InDateRange(thisMonthStart, now)).Where(t => t.Status == TaskItemStatus.Done).Count(),
    //         LastMonthCompletedTasks = x.Tasks.AsQueryable().Where(InDateRange(lastMonthStart, lastMonthEnd)).Where(t => t.Status == TaskItemStatus.Done).Count(),
    //         ThisMonthOverdueTasks = x.Tasks.AsQueryable().Where(InDateRange(thisMonthStart, now)).Where(t => t.Status != TaskItemStatus.Done).Where(t => t.EndDate < now).Count(),
    //         LastMonthOverdueTasks = x.Tasks.AsQueryable().Where(InDateRange(lastMonthStart, lastMonthEnd)).Where(t => t.Status != TaskItemStatus.Done).Where(t => t.EndDate < now).Count(),
    //         TaskTrends = taskTrends,
    //       }).FirstOrDefaultAsync(cancellationToken)
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

  public static Expression<Func<TaskItem, bool>> InDateRange(DateTime start, DateTime end) =>
    t => (t.CreatedAt >= start && t.CreatedAt <= end) || (t.LastModified >= start && t.LastModified <= end);
}
