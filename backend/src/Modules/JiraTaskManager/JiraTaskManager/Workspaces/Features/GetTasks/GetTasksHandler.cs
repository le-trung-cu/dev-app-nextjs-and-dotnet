
using System.Data.SqlTypes;
using System.Text.Json.Serialization;
using Auth.Contracts.Auth.Features.GetUsers;

namespace JiraTaskManager.Workspaces.Features.GetTasks;


public record GetTasksQuery : IQuery<GetTasksResult>
{
  public Guid WorkspaceId { get; set; }
  public Guid? ProjectId { get; set; }
  public string? AssigneeId { get; set; }
  public TaskItemStatus? Status { get; set; }
  public DateTime? EndDate { get; set; }
}

public record GetTasksResult(bool IsSuccess, IEnumerable<TaskDto> Tasks, IEnumerable<MemberDto> Members);

public class GetTasksHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user, ISender sender) : IQueryHandler<GetTasksQuery, GetTasksResult>
{
  public async Task<GetTasksResult> Handle(GetTasksQuery query, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var tasksQuery = dbContext.TaskItems.AsNoTracking().Where(x => x.WorkspaceId == query.WorkspaceId);

    if (query.ProjectId.HasValue)
    {
      tasksQuery = tasksQuery.Where(x => x.ProjectId == query.ProjectId.Value);
    }
    if (query.AssigneeId != null)
    {
      var member = await dbContext.Members.AsNoTracking()
        .Where(x => x.WorkspaceId == query.WorkspaceId && x.UserId == query.AssigneeId)
        .FirstOrDefaultAsync(cancellationToken);
      if(member == null)
      {
        tasksQuery = tasksQuery.Where(x => 1==2);
      }else {
        tasksQuery = tasksQuery.Where(x => x.AssigneeId == member.Id);
      }
    }
    if(query.Status.HasValue)
    {
      tasksQuery = tasksQuery.Where(x => x.Status == query.Status);
    }
    if(query.EndDate.HasValue)
    {
      tasksQuery = tasksQuery.Where(x => x.EndDate <= query.EndDate);
    }

    var tasks = await tasksQuery.ToListAsync(cancellationToken);
    var memberIds = tasks.Select(x => x.AssigneeId).ToHashSet();
    var members = await dbContext.Members.Where(x => memberIds.Contains(x.Id)).ToListAsync(cancellationToken);
    var userIds = members.Select(x => x.UserId);

    var usersResul = await sender.Send(new GetUsersQuery(userIds), cancellationToken);

    var membersResult = from member in members
                  join user in usersResul.Users
                  on member.UserId equals user.Id
                  select new MemberDto( member.Id, query.WorkspaceId, user.Id, member.Role, user.Name, user.Email);

    return new GetTasksResult(true, tasks.Adapt<IEnumerable<TaskDto>>(), membersResult.Adapt<IEnumerable<MemberDto>>());
  }
}
