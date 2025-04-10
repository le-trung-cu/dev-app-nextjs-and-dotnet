
namespace SlackChat.Workspaces.Features.GetChannels;

public class GetChannelsEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/slack/workspaces/{workspaceId}/channels",
    async (Guid workspaceId, ISender sender) =>
    {
      var result = await sender.Send(new GetChannelsQuery(workspaceId));
      return result;
    });
  }
}
