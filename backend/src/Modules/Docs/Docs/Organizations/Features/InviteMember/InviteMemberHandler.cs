using Auth.Contracts.Auth.Features.GetUsers;
using Docs.Organizations.ValueObjects;
using Shared.Exceptions;

namespace Docs.Organizations.Features.InviteMember;

public record InviteMemberCommand(Guid OrganizationId, List<string> UserIds, MemberRole Role) : ICommand<InviteMemberResult>;
public record InviteMemberResult(bool IsSuccess);

public class InviteMemberHandler
  (DocumentDbContext dbContext, ClaimsPrincipal user, ISender sender)
  : ICommandHandler<InviteMemberCommand, InviteMemberResult>
{
  public async Task<InviteMemberResult> Handle(InviteMemberCommand command, CancellationToken cancellationToken)
  {
    var userMembers = await sender.Send(new GetUsersQuery(command.UserIds), cancellationToken);
    if (userMembers?.Users.Count() != command.UserIds.Count)
    {
      throw new NotFoundException("User not found");
    }

    var userId = user.GetUserId();
    var organization = await dbContext.Organizations
      .Where(x => x.Id == command.OrganizationId)
      .Include(x => x.Members.Where(m =>  command.UserIds.Contains(m.UserId) || m.UserId == userId))
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new OrganizationNotFoundException(command.OrganizationId);
   
    var role = organization.Members.FirstOrDefault(x => x.UserId == userId)?.Role;
    if (role != MemberRole.Admin)
    {
      throw new BadRequestException("Unauthorized");
    }
    foreach (var user in userMembers.Users)
    {
      organization.InviteMember(user.Id, command.Role);
    }

    await dbContext.SaveChangesAsync(cancellationToken);
    return new InviteMemberResult(true);
  }
}
