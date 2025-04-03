namespace JiraTaskManager.Workspaces.Features.JoinWorkspace;

public record JoinWorkspaceCommand(Guid WorkspaceId, string InviteToken)
  : ICommand<JoinWorkspaceResult>;

public record JoinWorkspaceResult(bool IsSuccess, Guid WorkspaceId);

public class JoinWorkspaceHandler
  (WorkspaceDbContext context, ClaimsPrincipal user)
  : ICommandHandler<JoinWorkspaceCommand, JoinWorkspaceResult>
{
  public async Task<JoinWorkspaceResult> Handle(JoinWorkspaceCommand command, CancellationToken cancellationToken)
  {
    var workspace = await context.Workspaces
      .Include(x => x.Members)
      .FirstOrDefaultAsync(x => x.Id == command.WorkspaceId && x.InviteToken == command.InviteToken, cancellationToken)
      ?? throw new BadRequestException("Invite link is invalidate");
    var userId = user.GetUserId();

    workspace.AddMember(userId, MemberRole.Member);
    await context.SaveChangesAsync(cancellationToken);

    return new JoinWorkspaceResult(true, workspace.Id);
  }
}
