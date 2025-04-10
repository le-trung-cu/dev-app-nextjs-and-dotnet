namespace SlackChat.Workspaces.Features.CreateWorkspace;

public record CreateWorkspaceCommand(string Name)
  : ICommand<CreateWorkspaceResult>;

public record CreateWorkspaceResult(bool IsSuccess, Guid Id);

public class CreateWorkspaceCommandValidator : AbstractValidator<CreateWorkspaceCommand>
{
  public CreateWorkspaceCommandValidator()
  {
    RuleFor(x => x.Name).MaximumLength(50).MinimumLength(3);
  }
}

public class CreateWorkspaceHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user)
  : ICommandHandler<CreateWorkspaceCommand, CreateWorkspaceResult>
{
  public async Task<CreateWorkspaceResult> Handle(CreateWorkspaceCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();

    var workspace = Workspace.Create(userId, command.Name);

    dbContext.Workspaces.Add(workspace);
    await dbContext.SaveChangesAsync(cancellationToken);

    return new CreateWorkspaceResult(true, workspace.Id);
  }
}
