using System;

namespace JiraTaskManager.Workspaces.Features.UpdateMember;

public record UpdateMemberRequest(MemberRole Role);

public class UpdateMemberEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPut("/api/jira/workspaces/{workspaceId}/members/{userId}",
    async (Guid workspaceId, string userId, UpdateMemberRequest request, ISender sender) =>
    {
      var result = await sender.Send(new UpdateMemberCommand(workspaceId, userId, request.Role));
      return result;
    }).RequireAuthorization();
  }
}
