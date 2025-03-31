using Auth.Contracts.Auth.Features.GetUsers;

namespace Auth.Auth.Features.GetUsers;

public class GetUsersHandler
  (UserManager<User> userManager) : IQueryHandler<GetUsersQuery, GetUsersResult>
{
    public async Task<GetUsersResult> Handle(GetUsersQuery query, CancellationToken cancellationToken)
    {
      var users = await userManager.Users.AsNoTracking()
      .Where(x => query.UserIds.Contains(x.Id))
      .Select(x => new UserItemDto(x.Id, x.Email, x.Name)) 
      .ToListAsync(cancellationToken);

      return new GetUsersResult(users);
    }
}
