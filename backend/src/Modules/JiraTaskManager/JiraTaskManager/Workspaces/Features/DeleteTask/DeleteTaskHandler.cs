using System;

namespace JiraTaskManager.Workspaces.Features.DeleteTask;

public record DeleteTaskCommand(Guid WorkspaceId, Guid TaskId)
  : ICommand<DeleteTaskResult>;

public record DeleteTaskResult(bool IsSuccess);
public class DeleteTaskHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user) : ICommandHandler<DeleteTaskCommand, DeleteTaskResult>
{
  public async Task<DeleteTaskResult> Handle(DeleteTaskCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var workspace = await dbContext.Workspaces
      .Where(x => x.Id == command.WorkspaceId)
      .Include(x => x.Tasks.Where(t => t.Id == command.TaskId))
      .Include(x => x.Members.Where(m => m.UserId == userId))
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorkspaceId);

    var checkPermision = workspace.Members.Any();
    if (!checkPermision)
    {
      throw new BadRequestException("Unauthorized");
    }
    workspace.RemoveTask(command.TaskId);

    await dbContext.SaveChangesAsync(cancellationToken);

    return new DeleteTaskResult(true);
  }
}
