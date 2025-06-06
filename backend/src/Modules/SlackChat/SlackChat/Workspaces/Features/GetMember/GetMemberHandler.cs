using System;
using Auth.Contracts.Auth.Features.GetUsers;

namespace SlackChat.Workspaces.Features.GetMember;

public record GetMemberCommand(Guid WorkspaceId, string UserId)
  : ICommand<GetMemberCommandResult>;

public record GetMemberCommandResult(bool IsSuccess, MemberDto Member);

public class GetMemberHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user, ISender sender)
  : ICommandHandler<GetMemberCommand, GetMemberCommandResult>
{
  public async Task<GetMemberCommandResult> Handle(GetMemberCommand query, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var workspace = await dbContext.Workspaces
      .AsNoTracking()
      .Where(x => x.Id == query.WorkspaceId)
      .Include(x => x.Members.Where(x => x.UserId == userId || x.UserId == query.UserId))
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(query.WorkspaceId);
    var checkPermision = workspace.Members.FirstOrDefault(x => x.UserId == userId)
      ?? throw new BadRequestException("Unauthorized");

    var member = workspace.Members.FirstOrDefault(x => x.UserId == query.UserId)
      ?? throw new MemberNotFoundException(query.UserId);

    var usersResult = await sender.Send(new GetUsersQuery([member.UserId]), cancellationToken);
    var userFirst = usersResult.Users.First();

    var memberDto = new MemberDto(member.Id, member.WorkspaceId, member.UserId, member.Role, userFirst.Name, userFirst.Email);

    return new GetMemberCommandResult(true, memberDto);
  }
}
