namespace SlackChat.Workspaces.Features.UpdateChannel;

public record UpdateChannelRequest(string Name);

public class UpdateChannelEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/slack/workspaces/{workspaceId}/channels/{channelId}",
    async (Guid workspaceId, Guid channelId, UpdateChannelRequest request, ISender sender) =>
    {
      var result = await sender.Send(new UpdateChannelCommand(workspaceId, channelId, request.Name));
      return result;
    });
  }
}
