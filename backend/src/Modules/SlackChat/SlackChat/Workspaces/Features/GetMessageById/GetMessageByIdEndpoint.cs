
namespace SlackChat.Workspaces.Features.GetMessageById;

public class GetMessageByIdEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/slack/workspaces/{workspaceId}/messages/{messageId}",
    async (Guid workspaceId, Guid messageId, ISender sender) =>
    {
      var result = await sender.Send(new GetMessageByIdQuery(workspaceId, messageId));
      return result;
    }).RequireAuthorization();
  }
}
