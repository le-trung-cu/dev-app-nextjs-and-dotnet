
namespace SlackChat.Workspaces.Features.DeleteWorkspace;

public record DeleteWorkspaceCommand(Guid WorkspaceId) : ICommand<DeleteWorkspaceResult>;
public record DeleteWorkspaceResult(bool IsSuccess);

public class DeleteWorkspaceHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user)
  : ICommandHandler<DeleteWorkspaceCommand, DeleteWorkspaceResult>
{
  public async Task<DeleteWorkspaceResult> Handle(DeleteWorkspaceCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();

    var member = await dbContext.Members
      .Where(x => x.WorkspaceId == command.WorkspaceId && x.UserId == userId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new MemberNotFoundException(command.WorkspaceId, userId);

    if (member.Role != MemberRole.Owner)
    {
      throw new BadRequestException("Unauthorized");
    }

    var workspace = await dbContext.Workspaces
      .Where(x => x.Id == command.WorkspaceId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorkspaceId);

    dbContext.Workspaces.Remove(workspace);
    await dbContext.SaveChangesAsync(cancellationToken);

    return new DeleteWorkspaceResult(true);
  }
}
