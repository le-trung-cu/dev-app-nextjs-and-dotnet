using System;

namespace JiraTaskManager.Workspaces.Features.DeleteMember;

public record DeleteMemberCommand(Guid WorkspaceId, string UserId) : ICommand<DeleteMemberResult>;
public record DeleteMemberResult(bool IsSuccess);
public class DeleteMemberHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user) : ICommandHandler<DeleteMemberCommand, DeleteMemberResult>
{
  public async Task<DeleteMemberResult> Handle(DeleteMemberCommand command, CancellationToken cancellationToken)
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

    workspace.RemoveMember(command.UserId);
    await dbContext.SaveChangesAsync(cancellationToken);

    return new DeleteMemberResult(true);
  }
}
