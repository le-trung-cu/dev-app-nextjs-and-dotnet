using System;

namespace JiraTaskManager.Workspaces.Features.DeleteWorkspace;

public record DeleteWorkspaceCommand(Guid WorkspaceId) : ICommand<DeleteWorkspaceResult>;
public record DeleteWorkspaceResult(bool IsSuccess);

public class DeleteWorkspaceHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user) : ICommandHandler<DeleteWorkspaceCommand, DeleteWorkspaceResult>
{
  public async Task<DeleteWorkspaceResult> Handle(DeleteWorkspaceCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var workspace = await dbContext.Workspaces
      .Where(x => x.Id == command.WorkspaceId)
      .Include(x => x.Members.Where(m => m.UserId == userId))
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorkspaceId);

    if (!workspace.Members.Any())
    {
      throw new BadRequestException("Unauthorized");
    }

    // await dbContext.Members.Where(x => x.WorkspaceId == command.WorkspaceId).ExecuteDeleteAsync(cancellationToken);
    // await dbContext.Projects.Where(x => x.WorkspaceId == command.WorkspaceId).ExecuteDeleteAsync(cancellationToken);
    // await dbContext.TaskItems.Where(x => x.WorkspaceId == command.WorkspaceId).ExecuteDeleteAsync(cancellationToken);
    // await dbContext.Workspaces.Where(x => x.Id == command.WorkspaceId).ExecuteDeleteAsync(cancellationToken);

    dbContext.Workspaces.Remove(workspace);
    await dbContext.SaveChangesAsync(cancellationToken);

    return new DeleteWorkspaceResult(true);
  }
}
