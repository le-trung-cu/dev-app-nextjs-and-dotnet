namespace SlackChat.Workspaces.Features.UpdateMessage;

public record UpdateMessageCommand(Guid WorkspaceId, Guid MessageId, string Body)
  : ICommand<UpdateMessageResult>;

public record UpdateMessageResult(bool IsSuccess);

public class UpdateMessageHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user) : ICommandHandler<UpdateMessageCommand, UpdateMessageResult>
{
  public async Task<UpdateMessageResult> Handle(UpdateMessageCommand command, CancellationToken cancellationToken)
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
      ??throw new MessageNotFoundException(command.MessageId);
    if(message.MemberId != member.Id)
    {
      throw new BadRequestException("Unauthorized");
    }
    
    workspace.UpdateMessage(command.MessageId, command.Body);

    await dbContext.SaveChangesAsync(cancellationToken);
    
    return new UpdateMessageResult(true);
  }
}
