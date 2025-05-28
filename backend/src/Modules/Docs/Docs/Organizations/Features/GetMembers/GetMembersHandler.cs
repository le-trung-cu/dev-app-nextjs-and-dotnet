namespace Docs.Organizations.Features.GetMembers;

public record GetMembersQuery(Guid OrganizationId) : IQuery<GetMembersResult>;

public record GetMembersResult(bool IsSuccess, IEnumerable<MemberDto> Members);
public class GetMembersHandler
  (DocumentDbContext dbContext, ISender sender) : IQueryHandler<GetMembersQuery, GetMembersResult>
{
  public async Task<GetMembersResult> Handle(GetMembersQuery query, CancellationToken cancellationToken)
  {
    var organization = await dbContext.Organizations.AsNoTracking()
      .Where(x => x.Id == query.OrganizationId)
      .Include(x => x.Members)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new OrganizationNotFoundException(query.OrganizationId);

    var userIds = organization.Members.Select(x => x.UserId);
    var usersResult = await sender.Send(new GetUsersQuery(userIds), cancellationToken);

    var members = from member in organization.Members
                  join user in usersResult.Users
                  on member.UserId equals user.Id
                  select new MemberDto(
                      member.Id,
                      query.OrganizationId,
                      member.UserId,
                      member.Role,
                      member.IsJoined,
                      user.Name,
                      user.Email);

    return new GetMembersResult(true, members);
  }
}
