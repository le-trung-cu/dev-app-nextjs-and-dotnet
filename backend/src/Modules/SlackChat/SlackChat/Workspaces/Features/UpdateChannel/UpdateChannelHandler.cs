namespace SlackChat.Workspaces.Features.UpdateChannel;


public record UpdateChannelCommand
  (Guid WorkspaceId, Guid ChannelId, string Name)
  : ICommand<UpdateChannelResult>;

public record UpdateChannelResult(bool IsSuccess, Guid WorkspaceId, Guid ChannelId);

public class UpdateChannelHandler
  (WorkspaceDbContext dbContext)
  : ICommandHandler<UpdateChannelCommand, UpdateChannelResult>
{
  public async Task<UpdateChannelResult> Handle(UpdateChannelCommand command, CancellationToken cancellationToken)
  {
    var workspace = await dbContext.Workspaces
      .Where(x => x.Id == command.WorkspaceId)
      .Include(x => x.Channels)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorkspaceId);

    var channel = workspace.UpdateChannel(command.ChannelId, command.Name);
    await dbContext.SaveChangesAsync(cancellationToken);

    return new UpdateChannelResult(true, command.WorkspaceId, channel.Id);
  }
}
