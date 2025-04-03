
namespace JiraTaskManager.Workspaces.Features.GetWorkspaceAnalytics;

public class GetWorkspaceAnalyticsEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/jira/workspaces/{workspaceId}/analytics",
      async (Guid workspaceId, ISender sender) =>
      {
        var result = await sender.Send(new GetWorkspaceAnalyticsCommand(workspaceId));
        return result;
      }).RequireAuthorization();
  }
}
