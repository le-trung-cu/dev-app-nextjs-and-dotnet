
using Microsoft.AspNetCore.Mvc;

namespace JiraTaskManager.Workspaces.Features.UpdateWorkspace;
public record UpdateWorkspaceRequest
{
  public string Name { get; set; } = default!;
  public string? ImgUrl { get; set; }
  public IFormFile? File { get; set; }
};

public record ResetInviteTokenResponse (bool IsSuccess);

public class UpdateWorkspaceEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPut("/api/jira/workspaces/{workspaceId}",
      async (Guid workspaceId, [FromForm] UpdateWorkspaceRequest request, ISender sender) =>
      {
        var command = new UpdateWorkspaceCommand(workspaceId, request.Name, request.ImgUrl, request.File);
        var result = await sender.Send(command);
        return result;
      })
      .DisableAntiforgery()
      .RequireAuthorization();
  }
}
