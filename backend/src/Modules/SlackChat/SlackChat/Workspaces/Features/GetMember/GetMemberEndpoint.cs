using System;

namespace SlackChat.Workspaces.Features.GetMember;

public class GetMemberEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/slack/workspaces/{workspaceId}/members/{userId}",
    async (Guid workspaceId, string userId, ISender sender) =>
    {
      var result = await sender.Send(new GetMemberCommand(workspaceId, userId));
      return result;
    }).RequireAuthorization();
  }
}
