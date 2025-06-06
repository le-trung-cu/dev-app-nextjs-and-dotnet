using Microsoft.AspNetCore.Http;
using Shared.Services;
using SlackChat.Hubs;

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
  (WorkspaceDbContext dbContext, ClaimsPrincipal user, IUploadFileService fileService, IChatMessageSender chatMessageSender)
  : ICommandHandler<CreateMessageCommand, CreateMessageResult>
{
  public async Task<CreateMessageResult> Handle(CreateMessageCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();

    var workspaceQuery = dbContext.Workspaces
      .Where(x => x.Id == command.WorkspaceId)
      .Include(x => x.Members.Where(m => m.UserId == userId))
      .AsQueryable();

    if (command.ConversationId.HasValue)
    {
      workspaceQuery = workspaceQuery.Include(x => x.Conversations.Where(c => c.Id == command.ConversationId.Value));
    }

    if (command.ChannelId.HasValue)
    {
      workspaceQuery = workspaceQuery.Include(x => x.Channels.Where(t => t.Id == command.ChannelId.Value));
    }

    if (command.ParentMessageId.HasValue)
    {
      workspaceQuery = workspaceQuery.Include(x => x.Messages.Where(t => t.Id == command.ParentMessageId.Value));
    }

    var workspace = await workspaceQuery.FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorkspaceId);
    if (workspace.Members.Count == 0)
    {
      throw new BadRequestException("Unauthorized");
    }

    var member = workspace.Members[0];

    string? imageUrl = null;
    if (command.Image != null)
    {
      imageUrl = await fileService.SaveFileAsync(command.Image, Path.Combine("uploads", "slack", "messages"), cancellationToken);
    }

    var message = workspace.AddMessage(command.ChannelId, command.Body, imageUrl, member.Id, command.ParentMessageId, command.ConversationId);

    await dbContext.SaveChangesAsync(cancellationToken);

    await chatMessageSender.NewMessage(message.Adapt<MessageDto>());

    return new CreateMessageResult(true, message.Id);
  }
}
