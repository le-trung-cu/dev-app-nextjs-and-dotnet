namespace SlackChat.Workspaces.Features.DeleteMessage;

public class DeleteMessageEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapDelete("/api/slack/workspaces/{workspaceId}/messages/{messageId}",
    async (Guid workspaceId, Guid messageId, ISender sender) => {
      var command = new DeleteMessageCommand(workspaceId, messageId);
      var result = await sender.Send(command);
      return result;
    }).RequireAuthorization();
  }
}
