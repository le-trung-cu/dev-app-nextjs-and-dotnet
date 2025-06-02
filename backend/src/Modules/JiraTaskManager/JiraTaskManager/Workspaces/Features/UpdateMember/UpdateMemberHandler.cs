using System;

namespace JiraTaskManager.Workspaces.Features.UpdateMember;

public record UpdateMemberCommand(Guid WorkspaceId, string UserId, MemberRole Role) : ICommand<UpdateMemberResult>;
public record UpdateMemberResult(bool IsSuccess);
public class UpdateMemberHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user)
  : ICommandHandler<UpdateMemberCommand, UpdateMemberResult>
{
  public async Task<UpdateMemberResult> Handle(UpdateMemberCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var workspace = await dbContext.Workspaces
      .Where(x => x.Id == command.WorkspaceId)
      .Include(x => x.Members.Where(m => m.UserId == command.UserId || m.UserId == userId))
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(command.WorkspaceId);

    var userAction = workspace.Members.FirstOrDefault(x => x.UserId == userId);
    if (userAction == null || userAction.Role != MemberRole.Admin)
    {
      throw new BadRequestException("Unauthorized");
    }

    workspace.UpdateMember(command.UserId, command.Role);
    await dbContext.SaveChangesAsync(cancellationToken);

    return new UpdateMemberResult(true);
  }
}
