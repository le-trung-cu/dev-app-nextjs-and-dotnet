
using Auth.Contracts.Auth.Features.GetUsers;

namespace SlackChat.Workspaces.Features.GetCurrentMember;

public record GetCurrentMemberQuery(Guid WorkspaceId)
  : IQuery<GetCurrentMemberResult>;

public record GetCurrentMemberResult(bool IsSuccess, MemberDto Member);

public class GetCurrentMemberHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user, ISender sender)
  : IQueryHandler<GetCurrentMemberQuery, GetCurrentMemberResult>
{
  public async Task<GetCurrentMemberResult> Handle(GetCurrentMemberQuery query, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var member = await dbContext.Members.AsNoTracking()
      .Where(x => x.WorkspaceId == query.WorkspaceId && x.UserId == userId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new MemberNotFoundException(query.WorkspaceId, userId);

    var result = await sender.Send(new GetUsersQuery([userId]), cancellationToken);
    var userResult = result.Users.First();

    var memberDto = new MemberDto(member.Id, member.WorkspaceId, member.UserId, member.Role, userResult.Name, userResult.Email);

    return new GetCurrentMemberResult(true, memberDto);
  }
}
