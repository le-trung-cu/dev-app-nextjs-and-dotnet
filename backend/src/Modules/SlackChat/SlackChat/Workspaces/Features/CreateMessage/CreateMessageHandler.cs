using Microsoft.AspNetCore.Http;
using Shared.Services;

namespace SlackChat.Workspaces.Features.CreateMessage;

public record CreateMessageCommand(
  Guid WorkspaceId,
  Guid? ChannelId,
  string Body,
  IFormFile? Image,
  Guid? ParentMessageId,
  Guid? ConversationId
) : ICommand<CreateMessageResult>;

public record CreateMessageResult(bool IsSuccess, Guid MessageId);

public class CreateMessageHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user, IUploadFileService fileService)
  : ICommandHandler<CreateMessageCommand, CreateMessageResult>
{
  public async Task<CreateMessageResult> Handle(CreateMessageCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var member = await dbContext.Members.AsNoTracking()
      .Where(x => x.WorkspaceId == command.WorkspaceId && x.UserId == userId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new BadRequestException("Unauthorized");

    var workspaceQuery = dbContext.Workspaces
      .Where(x => x.Id == command.WorkspaceId);
    if(command.ChannelId.HasValue)
    {
      workspaceQuery = workspaceQuery.Include(x => x.Channels.Where(t => t.Id == command.ChannelId.Value));
    }

    if (command.ParentMessageId.HasValue)
    {
      workspaceQuery = workspaceQuery.Include(x => x.Messages.Where(t => t.Id == command.ParentMessageId.Value));
    }

    var workspace = await workspaceQuery.FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorkspaceId);
    
    string? imageUrl = null;
    if(command.Image != null)
    {
      imageUrl = await fileService.SaveFileAsync(command.Image, Path.Combine("uploads", "slack", "messages"), cancellationToken);
    }

    var message = workspace.AddMessage(command.ChannelId, command.Body, imageUrl, member.Id, command.ParentMessageId, command.ConversationId);

    await dbContext.SaveChangesAsync(cancellationToken);

    return new CreateMessageResult(true, message.Id);
  }
}
