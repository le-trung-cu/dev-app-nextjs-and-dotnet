using Microsoft.AspNetCore.Http;
using Shared.Services;

namespace SlackChat.Workspaces.Features.CreateMessage;

public record CreateMessageCommand(
  Guid WorkspaceId,
  Guid ChannelId,
  string Body,
  IFormFile? Image,
  Guid? ParentMessageId
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

    var channelQuery = dbContext.Channels
      .Where(x => x.Id == command.ChannelId && x.WorkspaceId == command.WorkspaceId);
    if (command.ParentMessageId.HasValue)
    {
      channelQuery = channelQuery.Include(x => x.Messages.Where(t => t.Id == command.ParentMessageId.Value));
    }

    var channel = await channelQuery.FirstOrDefaultAsync(cancellationToken)
      ?? throw new ChannelNotFoundException(command.ChannelId);
    
    string? imageUrl = null;
    if(command.Image != null)
    {
      imageUrl = await fileService.SaveFileAsync(command.Image, Path.Combine("uploads", "slack", "messages"), cancellationToken);
    }

    var message = channel.AddMessage(command.Body, imageUrl, member.Id, command.ParentMessageId);

    await dbContext.SaveChangesAsync(cancellationToken);

    return new CreateMessageResult(true, message.Id);
  }
}
