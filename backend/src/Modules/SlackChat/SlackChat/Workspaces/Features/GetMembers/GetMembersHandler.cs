
using Auth.Contracts.Auth.Features.GetUsers;

namespace SlackChat.Workspaces.Features.GetMembers;

public record GetMembersQuery(Guid WorkspaceId) : IQuery<GetMembersResult>;

public record GetMembersResult(bool IsSuccess, IEnumerable<MemberDto> Members);
public class GetMembersHandler
  (WorkspaceDbContext dbContext, ISender sender): IQueryHandler<GetMembersQuery, GetMembersResult>
{
  public async Task<GetMembersResult> Handle(GetMembersQuery query, CancellationToken cancellationToken)
  {
    var workspace = await dbContext.Workspaces.AsNoTracking()
      .Where(x => x.Id == query.WorkspaceId)
      .Include(x => x.Members)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(query.WorkspaceId);
    
    var userIds = workspace.Members.Select(x => x.UserId);
    var usersResult = await sender.Send(new GetUsersQuery(userIds), cancellationToken);

    var members = from member in workspace.Members
                  join user in usersResult.Users
                  on member.UserId equals user.Id
                  select new MemberDto(member.Id, query.WorkspaceId, member.UserId, member.Role, user.Name, user.Email);

    return new GetMembersResult(true, members);
  }
}
