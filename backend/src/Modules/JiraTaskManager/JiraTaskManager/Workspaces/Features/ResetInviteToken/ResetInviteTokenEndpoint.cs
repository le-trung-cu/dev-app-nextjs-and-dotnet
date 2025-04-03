using System;

namespace JiraTaskManager.Workspaces.Features.ResetInviteToken;

public class ResetInviteTokenEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
     app.MapPut("/api/jira/workspaces/{workspaceId}/invite-token",
      async (Guid workspaceId, ISender sender) =>
      {
        var result = await sender.Send(new ResetInviteTokenCommand(workspaceId));
        return result;
      }).RequireAuthorization();
  }
}
