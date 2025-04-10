namespace SlackChat.Workspaces.Features.UpdateMessage;

public record UpdateMessageRequest(string Body);

public class UpdateMessageEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPut("/api/slack/workspaces/{workspaceId}/messages/{messageId}",
    async (Guid workspaceId, Guid messageId, UpdateMessageRequest request, ISender sender) => {
      var command = new UpdateMessageCommand(workspaceId, messageId, request.Body);
      var result = await sender.Send(command);
      return result;
    }).RequireAuthorization();
  }
}
