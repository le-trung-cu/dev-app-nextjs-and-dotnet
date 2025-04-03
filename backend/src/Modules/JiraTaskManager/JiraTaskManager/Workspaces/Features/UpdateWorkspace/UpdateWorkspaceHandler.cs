namespace JiraTaskManager.Workspaces.Features.UpdateWorkspace;

public record UpdateWorkspaceCommand(Guid WorspaceId, string Name, string? ImgUrl, IFormFile? File)
  : ICommand<UpdateWorkspaceResult>;

public record UpdateWorkspaceResult(bool IsSuccess, Guid WorkspaceId);

public class UpdateWorkspaceHandler
  (WorkspaceDbContext context, IUploadFileService fileService)
  : ICommandHandler<UpdateWorkspaceCommand, UpdateWorkspaceResult>
{
  public async Task<UpdateWorkspaceResult> Handle(UpdateWorkspaceCommand command, CancellationToken cancellationToken)
  {
    var workspace = await context.Workspaces
      .FirstOrDefaultAsync(x => x.Id == command.WorspaceId, cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorspaceId);

    workspace.Update(command.Name, command.ImgUrl);
    if(command.File != null)
    {
      var imgUrl = await fileService.SaveFileAsync(command.File, Path.Combine("jira", "uploads", "workspaces"), cancellationToken);
      workspace.UpdateImgUrl(imgUrl);
    }

    await context.SaveChangesAsync(cancellationToken);
    return new UpdateWorkspaceResult(true, workspace.Id);
  }
}
