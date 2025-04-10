
namespace SlackChat.Workspaces.Features.UpdateWorkspace;
public record UpdateWorkspaceRequest
{
  public string Name { get; set; } = default!;
};

public record ResetInviteTokenResponse (bool IsSuccess);

public class UpdateWorkspaceEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPut("/api/slack/workspaces/{workspaceId}",
      async (Guid workspaceId, UpdateWorkspaceRequest request, ISender sender) =>
      {
        var command = new UpdateWorkspaceCommand(workspaceId, request.Name);
        var result = await sender.Send(command);
        return result;
      })
      .DisableAntiforgery()
      .RequireAuthorization();
  }
}
