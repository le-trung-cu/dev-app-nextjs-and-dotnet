
namespace SlackChat.Workspaces.Features.GetChannel;

public class GetChannelEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/slack/workspaces/{workspaceId}/channels/{channelId}",
    async (Guid workspaceId, Guid channelId, ISender sender) =>
    {
      var result = await sender.Send(new GetChannelQuery(workspaceId, channelId));
      return result;
    }).RequireAuthorization();
  }
}
