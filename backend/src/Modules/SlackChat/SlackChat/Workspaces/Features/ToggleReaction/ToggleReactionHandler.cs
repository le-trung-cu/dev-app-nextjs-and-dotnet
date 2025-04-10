
namespace SlackChat.Workspaces.Features.ToggleReaction;

public record ToggleReactionCommand(Guid WorkspaceId, Guid MessageId, string Value)
  : ICommand<ToggleReactionResult>;

public record ToggleReactionResult(bool IsSuccess, ReactionDto? Reaction);

public class ToggleReactionHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user)
  : ICommandHandler<ToggleReactionCommand, ToggleReactionResult>
{
  public async Task<ToggleReactionResult> Handle(ToggleReactionCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var member = await dbContext.Members.AsNoTracking()
      .Where(x => x.WorkspaceId == command.WorkspaceId && x.UserId == userId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new BadRequestException("Unauthorized");

    var message = await dbContext.Messages
      .Where(x => x.WorkspaceId == command.WorkspaceId && x.Id == command.MessageId)
      .Include(x => x.Reactions.Where(t => t.MemberId == member.Id && t.Value == command.Value))
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new MessageNotFoundException(command.MessageId);

    var reaction = message.ToggleReaction(member.Id, command.Value);
    await dbContext.SaveChangesAsync(cancellationToken);

    return new ToggleReactionResult(true, reaction?.Adapt<ReactionDto>());
  }
}
