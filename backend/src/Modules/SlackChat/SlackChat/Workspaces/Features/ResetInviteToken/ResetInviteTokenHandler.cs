
namespace SlackChat.Workspaces.Features.ResetInviteToken;

public record ResetInviteTokenCommand(Guid WorkspaceId):ICommand<ResetInviteTokenResult>;

public record ResetInviteTokenResult(bool IsSuccess);

public class ResetInviteTokenHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user)
  : ICommandHandler<ResetInviteTokenCommand, ResetInviteTokenResult>
{
  public async Task<ResetInviteTokenResult> Handle(ResetInviteTokenCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var member = await dbContext.Members.AsNoTracking()
      .Where(x => x.WorkspaceId == command.WorkspaceId && x.UserId == userId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new BadRequestException("Unauthorized");

    if(member.Role != MemberRole.Owner)
    {
      throw new BadRequestException("Unauthorized");
    }

    var workspace = await dbContext.Workspaces
      .Where(x => x.Id == command.WorkspaceId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorkspaceId);

    workspace.ResetInviteToken();
    await dbContext.SaveChangesAsync(cancellationToken);

    return new ResetInviteTokenResult(true);
  }
}
