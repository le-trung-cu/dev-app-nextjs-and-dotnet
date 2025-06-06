
namespace SlackChat.Workspaces.Features.DeleteChannel;

public record DeleteChannelCommand(Guid WorkspaceId, Guid ChannelId)
  : ICommand<DeleteChannelResult>;

public record DeleteChannelResult(bool IsSuccess);
public class DeleteChannelHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user)
  : ICommandHandler<DeleteChannelCommand, DeleteChannelResult>
{
  public async Task<DeleteChannelResult> Handle(DeleteChannelCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var workspace = await dbContext.Workspaces
      .Where(x => x.Id == command.WorkspaceId)
      .Include(x => x.Members.Where(x => x.UserId == userId))
      .Include(x => x.Channels.Where(t => t.Id == command.ChannelId))
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorkspaceId);
    if (workspace.Members.Count == 0)
    {
      throw new BadRequestException("Unauthorized");
    }
    var member = workspace.Members[0];
    if (member.Role != MemberRole.Admin)
    {
      throw new BadRequestException("Unauthorized");
    }

    workspace.RemoveChannel(command.ChannelId);
    await dbContext.SaveChangesAsync(cancellationToken);
    return new DeleteChannelResult(true);
  }
}
