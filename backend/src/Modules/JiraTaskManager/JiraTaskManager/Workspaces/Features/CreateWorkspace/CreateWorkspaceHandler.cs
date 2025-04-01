using FluentValidation;

namespace JiraTaskManager.Workspaces.Features.CreateWorkspace;

public record CreateWorkspaceCommand(string Name, string? ImgUrl, IFormFile? File)
  : ICommand<CreateWorkspaceResult>;

public record CreateWorkspaceResult(Guid Id, string Name);

public class CreateWorkspaceCommandValidator : AbstractValidator<CreateWorkspaceCommand>
{
  public CreateWorkspaceCommandValidator()
  {
    RuleFor(x => x.Name).MaximumLength(50).MinimumLength(3);
  }
}

public class CreateWorkspaceHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user, IUploadFileService fileService)
  : ICommandHandler<CreateWorkspaceCommand, CreateWorkspaceResult>
{
  public async Task<CreateWorkspaceResult> Handle(CreateWorkspaceCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserIdOrThrow();

    var workspace = Workspace.Create(userId, command.Name, command.ImgUrl);

    if (command.File != null)
    {
      var imgUrl = await fileService.SaveFileAsync(command.File, Path.Combine("jira", "uploads", "workspaces"), cancellationToken);
      workspace.UpdateImgUrl(imgUrl);
    }

    dbContext.Workspaces.Add(workspace);
    await dbContext.SaveChangesAsync(cancellationToken);

    return workspace.Adapt<CreateWorkspaceResult>();
  }
}
