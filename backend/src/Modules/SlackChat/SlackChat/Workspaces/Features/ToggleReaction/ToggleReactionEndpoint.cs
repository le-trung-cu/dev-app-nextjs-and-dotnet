namespace SlackChat.Workspaces.Features.ToggleReaction;

public record ToggleReactionRequest(string Value);

public class ToggleReactionEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPut("/api/slack/workspaces/{workspaceId}/messages/{messageId}/reactions",
    async (Guid workspaceId, Guid messageId, ToggleReactionRequest request, ISender sender) =>
    {
      var command = new ToggleReactionCommand(workspaceId, messageId, request.Value);
      var result = await sender.Send(command);
      return result;
    });
  }
}
