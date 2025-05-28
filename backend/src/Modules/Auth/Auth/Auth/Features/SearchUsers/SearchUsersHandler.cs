
namespace Auth.Auth.Features.SearchUsers;

public record SearchUsersQuery(string Search) :IQuery<SearchUsersResult>;
public record SearchUsersResult(bool IsSuccess, IEnumerable<UserDto> Users);

public class SearchUsersHandler
  (UserManager<User> userManager) : IQueryHandler<SearchUsersQuery, SearchUsersResult>
{
  public async Task<SearchUsersResult> Handle(SearchUsersQuery query, CancellationToken cancellationToken)
  {
    var users = await userManager.Users
      .AsNoTracking()
      .Where(x => x.NormalizedEmail.Contains(query.Search.ToUpper()) || x.NormalizedEmail.Contains(query.Search.ToUpper()))
      .ToListAsync(cancellationToken);

    return new SearchUsersResult(true, users.Adapt<IEnumerable<UserDto>>());
  }
}
