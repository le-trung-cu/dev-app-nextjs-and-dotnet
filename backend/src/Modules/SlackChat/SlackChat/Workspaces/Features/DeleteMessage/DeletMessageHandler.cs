
namespace SlackChat.Workspaces.Features.DeleteMessage;

public record DeleteMessageCommand(Guid WorkspaceId, Guid MessageId)
  : ICommand<DeleteMessageResult>;

public record DeleteMessageResult(bool IsSuccess);

public class DeletMessageHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user)
  : ICommandHandler<DeleteMessageCommand, DeleteMessageResult>
{
  public async Task<DeleteMessageResult> Handle(DeleteMessageCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var member = await dbContext.Members
      .AsNoTracking()
      .Where(x => x.WorkspaceId == command.WorkspaceId && x.UserId == userId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new BadRequestException("Unauthorized");

    var workspace = await dbContext.Workspaces
      .Where(x => x.Id == command.WorkspaceId)
      .Include(x => x.Messages.Where(t => t.Id == command.MessageId))
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorkspaceId);

    var message = workspace.Messages.FirstOrDefault(x => x.Id == command.MessageId)
      ?? throw new MessageNotFoundException(command.MessageId);
    if (message.MemberId != member.Id)
    {
      throw new BadRequestException("Unauthorized");
    }

    workspace.DeleteMessage(command.MessageId);

    await dbContext.SaveChangesAsync(cancellationToken);

    return new DeleteMessageResult(true);
  }

}
