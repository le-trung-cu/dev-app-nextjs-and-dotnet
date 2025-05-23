
namespace Tenants.Tenants.Features.GetMembers;

public record GetMembersQuery(string TenantId) : IQuery<GetMembersResult>;

public record GetMembersResult(bool IsSuccess, IEnumerable<MemberDto> Members);

public class GetMembersHandler
  (TenantDbContext dbContext, ISender sender)
  : IQueryHandler<GetMembersQuery, GetMembersResult>
{
  public async Task<GetMembersResult> Handle(GetMembersQuery query, CancellationToken cancellationToken)
  {
    var tenant = await sender.Send(new GetTenantByIdQuery(query.TenantId), cancellationToken);
    var members = await dbContext.Members.AsNoTracking()
      .Where(x => x.TenantId == tenant.Tenant.Id)
      .ToListAsync(cancellationToken);

    return new GetMembersResult(true, members.Adapt<IEnumerable<MemberDto>>());
  }
}
