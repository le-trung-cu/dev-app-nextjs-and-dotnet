
namespace SlackChat.Workspaces.Features.GetWorkspaceById;

public record GetWorkspaceByIdCommand(Guid WorkspaceId):ICommand<GetWorkspaceByIdResult>;

public record GetWorkspaceByIdResult(bool IsSuccess, WorkspaceDto Workspace);

public class GetWorkspaceByIdHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user) : ICommandHandler<GetWorkspaceByIdCommand, GetWorkspaceByIdResult>
{
  public async Task<GetWorkspaceByIdResult> Handle(GetWorkspaceByIdCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var member = await dbContext.Members.AsNoTracking()
      .Where(x => x.WorkspaceId == command.WorkspaceId && x.UserId == userId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new BadRequestException("Unauthorized");

    var workspace = await dbContext.Workspaces
      .Where(x => x.Id == command.WorkspaceId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorkspaceId);

    return new GetWorkspaceByIdResult(true, workspace.Adapt<WorkspaceDto>());
  }
}
