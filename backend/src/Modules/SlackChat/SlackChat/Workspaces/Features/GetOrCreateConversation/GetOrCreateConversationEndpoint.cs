using System;

namespace SlackChat.Workspaces.Features.GetOrCreateConversation;

public record GetOrCreateConversationRequest(string UserId);
public class GetOrCreateConversationEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPut("/api/slack/workspaces/{workspaceId}/converations",
    async (Guid workspaceId, GetOrCreateConversationRequest request, ISender sender) =>
    {
      var result = await sender.Send(new GetOrCreateConversationCommand(workspaceId, request.UserId));
      return result;
    }).RequireAuthorization();
  }
}
