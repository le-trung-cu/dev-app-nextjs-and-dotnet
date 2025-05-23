using System;

namespace JiraTaskManager.Workspaces.Features.GetProjectsByWorkspaceId;

public class GetProjectsByWorkspaceIdEndpoint: ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/jira/workspaces/{workspaceId}/projects",
    async (Guid workspaceId, ISender sender) =>
    {
      var result = await sender.Send(new GetProjectsByWorkspaceIdQuery(workspaceId));
      return result;
    })
    .RequireAuthorization();
  }
}