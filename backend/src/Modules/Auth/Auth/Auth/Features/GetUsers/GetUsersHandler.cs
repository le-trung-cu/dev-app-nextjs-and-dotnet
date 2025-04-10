using Auth.Auth.Exceptions;
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

    var userIds = users.Select(x => x.Id).ToHashSet();
    if (users.Count < query.UserIds.Count())
    {
      var missingId = query.UserIds.First(x => !userIds.Contains(x));
      throw new UserNotFoundException(missingId);
    }

    return new GetUsersResult(users);
  }
}
