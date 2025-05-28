using Docs.Organizations.Dtos;
using Mapster;

namespace Docs.Organizations.Features.GetOrganizations;


public record GetOrganizationsQuery : IQuery<GetOrganizationsResult>;
public record GetOrganizationsResult(bool IsSuccess, IEnumerable<OrganizationDto> Organizations);
public class GetOrganizationsHandler
  (DocumentDbContext dbContext, ClaimsPrincipal user) : IQueryHandler<GetOrganizationsQuery, GetOrganizationsResult>
{
  public async Task<GetOrganizationsResult> Handle(GetOrganizationsQuery request, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();

    var organizations = await dbContext.Organizations
      .AsNoTracking()
      .Include(x => x.Members.Where(m => m.UserId == userId))
      .Where(x => x.Members.Any(m => m.UserId == userId))
      .ToListAsync(cancellationToken);

    return new GetOrganizationsResult(true, organizations.Adapt<IEnumerable<OrganizationDto>>());
  }
}
