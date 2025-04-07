namespace SlackChat.Workspaces.Features.DeleteChannel;

public class DeleteChannelEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapDelete("/api/slack/workspaces/{workspaceId}/channels/{channelId}",
      async (Guid workspaceId, Guid channelId, ISender sender) =>
      {
        var result = await sender.Send(new DeleteChannelCommand(workspaceId, channelId));
        return result;
      });
  }
}
