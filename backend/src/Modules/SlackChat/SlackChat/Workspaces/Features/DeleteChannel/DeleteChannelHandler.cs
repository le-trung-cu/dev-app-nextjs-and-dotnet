
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
    var workspace = await dbContext.Workspaces
      .Where(x => x.Id == command.WorkspaceId)
      .Include(x => x.Channels.Where(t => t.Id == command.ChannelId))
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorkspaceId);

    workspace.RemoveChannel(command.ChannelId);

    return new DeleteChannelResult(true);
  }
}
