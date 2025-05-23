using System;

namespace Tenants.Tenants.Features.GetMember;

public class GetMemberHandler
  (TenantDbContext dbContext)
  : IQueryHandler<GetMemberQuery, GetMemberResult>
{
  public async Task<GetMemberResult> Handle(GetMemberQuery query, CancellationToken cancellationToken)
  {
    var member = await dbContext.Members
      .AsNoTracking()
      .Where(x => x.TenantId == query.TenantId && x.UserId == query.UserId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new MemberNotFoundException(query.TenantId, query.UserId);

    return new GetMemberResult(true, member.Adapt<MemberDto>());
  }
}
