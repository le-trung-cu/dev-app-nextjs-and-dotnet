using Microsoft.AspNetCore.Mvc;

namespace JiraTaskManager.Workspaces.Features.CreateWorkspace;

public record CreateWorkspaceRequest
{
  public string? Name { get; set; }
  public string? ImgUrl { get; set; }
  public IFormFile? File { get; set; }
}

public class CreateWorkspaceEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/jira/workspaces", async ([FromForm] CreateWorkspaceRequest request, ISender sender) =>
    {
      var result = await sender.Send(new CreateWorkspaceCommand(request.Name!, request.ImgUrl, request.File));

      return result;
    })
    .DisableAntiforgery()
    .RequireAuthorization();
  }
}
