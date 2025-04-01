
namespace JiraTaskManager.Workspaces.Features.CreateProject;

public record CreateProjectCommand
  (Guid WorkspaceId, string Name, string? ImgUrl, IFormFile? File)
  : ICommand<CreateProjectResult>;

public record CreateProjectResult(bool IsSuccess, Guid WorkspaceId, Guid ProjectId);

public class CreateProjectHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user, IUploadFileService fileService) : ICommandHandler<CreateProjectCommand, CreateProjectResult>
{
  public async Task<CreateProjectResult> Handle(CreateProjectCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var workspace = await dbContext.Workspaces
      .Where(x => x.Id == command.WorkspaceId)
      .Include(x => x.Projects.Where(t => t.Name == command.Name))
      // .Include(x => x.Members.Where(t => t.UserId == userId))
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorkspaceId);

    var project = workspace.AddProject(command.Name, command.ImgUrl);
    if (command.File != null)
    {
      var imgUrl = await fileService.SaveFileAsync(command.File, Path.Combine("jira", "uploads", "workspaces"), cancellationToken);
      project.UpdateImgUrl(imgUrl);
    }
    await dbContext.SaveChangesAsync(cancellationToken);
    return new CreateProjectResult(true, workspace.Id, project.Id);
  }
}
