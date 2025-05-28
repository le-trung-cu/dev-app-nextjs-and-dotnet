namespace Auth.Auth.Features.SearchUsers;

public class SearchUsersEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/auth/users",
    async ([AsParameters] SearchUsersQuery request, ISender sender) =>
    {
      var result = await sender.Send(request);
      return result;
    }).RequireAuthorization();
  }
}
