namespace JiraTaskManager.Workspaces.Features.GetWorkspaceById;

public class GetWorkspaceByIdEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/jira/workspaces/{workspaceId}",
    async (Guid workspaceId, ISender sender) =>
    {
      var result = await sender.Send(new GetWorkspaceByIdQuery(workspaceId));
      return result;
    }).RequireAuthorization();
  }
}
