namespace JiraTaskManager.Workspaces.Features.CreateTask;

public record CreateTaskCommand : ICommand<CreateTaskResult>
{
  public Guid WorkspaceId { get; set; }
  public Guid? ProjectId { get; set; }
  public string? AssigneeId { get; set; }
  public string Name { get; set; } = default!;
  public TaskItemStatus Status { get; set; }
  public Priority Priority { get; set; }
  public DateTime? EndDate { get; set; }
}

public record CreateTaskResult(bool IsSuccess, Guid TaskId);

public class CreateTaskHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user) : ICommandHandler<CreateTaskCommand, CreateTaskResult>
{
  public async Task<CreateTaskResult> Handle(CreateTaskCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var workspace = await dbContext.Workspaces
      .Where(x => x.Id == command.WorkspaceId)
      .Include(x => x.Members.Where(t => t.UserId == command.AssigneeId || t.UserId == userId).Take(2))
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorkspaceId);

    var current = workspace.Members.FirstOrDefault(x => x.UserId == userId)
      ?? throw new BadRequestException("UnAuthorize");

    var heightestPosition = await dbContext.TaskItems
      .CountAsync(x => x.WorkspaceId == command.WorkspaceId && x.Status == command.Status, cancellationToken);

    var task = workspace.AddTask(command.ProjectId, command.AssigneeId, command.Name, command.Status, command.Priority, command.EndDate, null);
    task.UpdatePosition((heightestPosition + 1) * 1000);
    await dbContext.SaveChangesAsync(cancellationToken);
    return new CreateTaskResult(true, task.Id);
  }
}
