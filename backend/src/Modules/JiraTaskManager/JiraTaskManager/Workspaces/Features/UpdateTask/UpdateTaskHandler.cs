using System;

namespace JiraTaskManager.Workspaces.Features.UpdateTask;

public record UpdateTaskCommand : ICommand<UpdateTaskResult>
{
  public Guid Id { get; set; }
  public Guid WorkspaceId { get; set; }
  public Guid? ProjectId { get; set; }
  public string? AssigneeId { get; set; }
  public string Name { get; set; } = default!;
  public TaskItemStatus Status { get; set; }
  public Priority Priority { get; set; }
  public DateTime? EndDate { get; set; }
  public string? Description { get; set; } = string.Empty;
}

public record UpdateTaskResult(bool IsSuccess, Guid TaskId);
public class UpdateTaskHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user)
  : ICommandHandler<UpdateTaskCommand, UpdateTaskResult>
{
  public async Task<UpdateTaskResult> Handle(UpdateTaskCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var workspace = await dbContext.Workspaces
     .Where(x => x.Id == command.WorkspaceId)
     .Include(x => x.Projects.Where(p => p.Id == command.ProjectId))
     .Include(x => x.Tasks.Where(t => t.Id == command.Id))
     .Include(x => x.Members.Where(m => m.UserId == userId || m.UserId == command.AssigneeId))
     .FirstOrDefaultAsync(cancellationToken)
     ?? throw new WorkspaceNotFoundException(command.WorkspaceId);

    var checkPermision = workspace.Members.Any(m => m.UserId == userId);
    if (!checkPermision)
    {
      throw new BadRequestException("Unauthorized");
    }

    if (command.Description == null)
    {
      workspace.UpdateTask(
           command.Id,
           command.ProjectId,
           command.AssigneeId,
           command.Name,
           command.Status,
           command.Priority,
           command.EndDate);
    }
    else
    {
      workspace.UpdateTask(command.Id, command.Description);
    }


    await dbContext.SaveChangesAsync(cancellationToken);

    return new UpdateTaskResult(true, command.Id);
  }
}
