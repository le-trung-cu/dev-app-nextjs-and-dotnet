namespace SlackChat.Workspaces.Features.GetWorkspaceInfo;

public class GetWorkspaceInfoEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/slack/workspaces/{workspaceId}/info",
    async (Guid workspaceId, ISender sender) =>
    {
      var result = await sender.Send(new GetWorkspaceInfoCommand(workspaceId));
      return result;
    });
  }
}
