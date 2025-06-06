
namespace SlackChat.Workspaces.Features.GetOrCreateConversation;

public record GetOrCreateConversationCommand(Guid WorkspaceId, string UserId)
  : ICommand<GetOrCreateConversationResult>;

public record GetOrCreateConversationResult(bool IsSuccess, Guid ConversationId);

public class GetOrCreateConversationHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user)
  : ICommandHandler<GetOrCreateConversationCommand, GetOrCreateConversationResult>
{
  public async Task<GetOrCreateConversationResult> Handle(GetOrCreateConversationCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var members = await dbContext.Members
      .Where(x => x.WorkspaceId == command.WorkspaceId && (x.UserId == userId || x.UserId == command.UserId))
      .ToListAsync(cancellationToken);
    var member1 = members.FirstOrDefault(x => x.UserId == userId) ?? throw new BadRequestException("Unauthorized");
    var member2 = members.FirstOrDefault(x => x.UserId == command.UserId) ?? throw new MemberNotFoundException(command.UserId);

    var workspace = await dbContext.Workspaces
      .Where(x => x.Id == command.WorkspaceId)
      .Include(x => x.Members.Where(x => x.UserId == userId || x.UserId == command.UserId))
      .Include(x => x.Conversations.Where(c => (c.MemberOneId == member1.Id && c.MemberTwoId == member2.Id)
      || (c.MemberOneId == member2.Id && c.MemberTwoId == member1.Id)))
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorkspaceId);

    var conversation = workspace.Conversations.FirstOrDefault();
    if (conversation == null)
    {
      conversation = workspace.AddConversation(member1.UserId, member2.UserId);
      await dbContext.SaveChangesAsync(cancellationToken);
    }

    return new GetOrCreateConversationResult(true, conversation.Id);
  }
}
