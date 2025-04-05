namespace SlackChat.Workspaces.Features.GetWorkspaces;

public class GetWorkspacesEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/slack/workspaces", async (ISender sender) =>
    {
      var result = await sender.Send(new GetWorkspacesQuery());
      return result;
    });
  }
}
