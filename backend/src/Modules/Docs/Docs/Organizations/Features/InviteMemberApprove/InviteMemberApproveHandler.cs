namespace Docs.Organizations.Features.InviteMemberApprove;

public record InviteMemberApproveCommand(Guid OrganizationId): ICommand<InviteMemberApproveResult>;

public record InviteMemberApproveResult(bool IsSuccess);
public class InviteMemberApproveHandler
  (DocumentDbContext dbContext, ClaimsPrincipal user)
   : ICommandHandler<InviteMemberApproveCommand, InviteMemberApproveResult>
{
  public async Task<InviteMemberApproveResult> Handle(InviteMemberApproveCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var organization = await dbContext.Organizations
      .Where(x => x.Id == command.OrganizationId)
      .Include(x => x.Members.Where(m => m.UserId == userId))
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new OrganizationNotFoundException(command.OrganizationId);
    organization.ApproveInvite(userId);

    await dbContext.SaveChangesAsync(cancellationToken);

    return new InviteMemberApproveResult(true);
  }
}
