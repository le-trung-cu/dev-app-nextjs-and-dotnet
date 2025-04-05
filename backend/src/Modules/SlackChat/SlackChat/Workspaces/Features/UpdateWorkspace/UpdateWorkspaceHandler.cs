namespace SlackChat.Workspaces.Features.UpdateWorkspace;

public record UpdateWorkspaceCommand(Guid WorspaceId, string Name)
  : ICommand<UpdateWorkspaceResult>;

public record UpdateWorkspaceResult(bool IsSuccess, Guid WorkspaceId);

public class UpdateWorkspaceHandler
  (WorkspaceDbContext context)
  : ICommandHandler<UpdateWorkspaceCommand, UpdateWorkspaceResult>
{
  public async Task<UpdateWorkspaceResult> Handle(UpdateWorkspaceCommand command, CancellationToken cancellationToken)
  {
    var workspace = await context.Workspaces
      .FirstOrDefaultAsync(x => x.Id == command.WorspaceId, cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorspaceId);

    workspace.Update(command.Name);

    await context.SaveChangesAsync(cancellationToken);
    return new UpdateWorkspaceResult(true, workspace.Id);
  }
}
