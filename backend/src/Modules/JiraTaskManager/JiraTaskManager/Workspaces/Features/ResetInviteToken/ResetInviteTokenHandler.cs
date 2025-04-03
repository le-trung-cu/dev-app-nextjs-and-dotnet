namespace JiraTaskManager.Workspaces.Features.ResetInviteToken;

public record ResetInviteTokenCommand(Guid WorspaceId)
  : ICommand<ResetInviteTokenResult>;

public record ResetInviteTokenResult( bool IsSuccess, Guid WorkspaceId, string InviteToken);


public class ResetInviteTokenHandler
  (WorkspaceDbContext context)
  : ICommandHandler<ResetInviteTokenCommand, ResetInviteTokenResult>
{
  public async Task<ResetInviteTokenResult> Handle(ResetInviteTokenCommand command, CancellationToken cancellationToken)
  {
    var workspace = await context.Workspaces
      .FirstOrDefaultAsync(x => x.Id == command.WorspaceId, cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorspaceId);

    workspace.ResetInviteToken();
    await context.SaveChangesAsync(cancellationToken);

    return new ResetInviteTokenResult(true, workspace.Id, workspace.InviteToken!);
  }
}
