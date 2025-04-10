
namespace SlackChat.Workspaces.Features.GetWorkspaceById;

public class GetWorkspaceByIdEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/slack/workspaces/{workspaceId}",
      async (Guid workspaceId, ISender sender) =>
      {
        var result = await sender.Send(new GetWorkspaceByIdCommand(workspaceId));
        return result;
      });
  }
}
