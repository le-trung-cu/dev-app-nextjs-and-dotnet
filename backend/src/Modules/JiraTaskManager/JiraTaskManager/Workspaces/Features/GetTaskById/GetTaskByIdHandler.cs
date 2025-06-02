
using Auth.Contracts.Auth.Features.GetUsers;

namespace JiraTaskManager.Workspaces.Features.GetTaskById;


public record GetTaskByIdQuery(Guid WorkspaceId, Guid TaskId) : IQuery<GetTaskByIdResult>;

public record GetTaskByIdResult(bool IsSuccess, TaskDto Task, WorkspaceDto Workspace, ProjectDto? Project, MemberDto? Assignee);

public class GetTaskByIdHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user, ISender sender)
  : IQueryHandler<GetTaskByIdQuery, GetTaskByIdResult>
{
  public async Task<GetTaskByIdResult> Handle(GetTaskByIdQuery query, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();

    var workspace = await dbContext.Workspaces.AsNoTracking()
      .Where(x => x.Id == query.WorkspaceId)
      .Include(x => x.Members.Where(m => m.UserId == userId))
      .Include(x => x.Tasks.Where(t => t.Id == query.TaskId))
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(query.WorkspaceId);

    var member = workspace.Members.FirstOrDefault() ?? throw new BadRequestException("Unauthorized");
    var task = workspace.Tasks.FirstOrDefault() ?? throw new TaskItemNotFoundException(query.TaskId);
    var project = await dbContext.Projects
      .AsNoTracking()
      .Where(x => x.Id == task.ProjectId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new ProjectNotFoundException(task.ProjectId!.Value);

    var assigneeMember = await dbContext.Members
      .AsNoTracking()
      .Where(x => x.Id == task.AssigneeId)
      .FirstOrDefaultAsync(cancellationToken);

    var assigneeUser = assigneeMember != null
      ? await sender.Send(new GetUsersQuery([assigneeMember.UserId]), cancellationToken)
      : null;
    MemberDto? assignee = null;
    if (assigneeMember != null && assigneeUser != null && assigneeUser.Users.Any())
    {
      var _user = assigneeUser.Users.First();
      assignee = new MemberDto(
        assigneeMember.Id,
        query.WorkspaceId,
        assigneeMember.UserId,
        assigneeMember.Role,
        _user.Name,
        _user.Email);
    }
    return new GetTaskByIdResult(
        true,
        task.Adapt<TaskDto>(),
        workspace.Adapt<WorkspaceDto>(),
        project.Adapt<ProjectDto>(),
        assignee
      );
  }
}
