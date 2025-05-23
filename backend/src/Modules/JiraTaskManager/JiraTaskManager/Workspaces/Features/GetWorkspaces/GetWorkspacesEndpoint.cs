using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace JiraTaskManager.Workspaces.Features.GetWorkspaces;

public class GetWorkspacesEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/jira/workspaces", async (ISender sender) =>
    {
      var result = await sender.Send(new GetWorkspacesQuery());
      return result;
    })
    .RequireAuthorization();
  }
}
