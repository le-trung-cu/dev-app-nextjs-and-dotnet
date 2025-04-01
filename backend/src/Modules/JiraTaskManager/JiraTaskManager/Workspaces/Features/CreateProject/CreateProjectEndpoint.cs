using Microsoft.AspNetCore.Mvc;

namespace JiraTaskManager.Workspaces.Features.CreateProject;

public record CreateProjectRequest
{
  public string Name { get; set; } = default!;
  public string? ImgUrl { get; set; }
  public IFormFile? File { get; set; }
}

public class CreateProjectEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/jira/workspaces/{workspaceId}/projects", async (Guid workspaceId , [FromForm] CreateProjectRequest request, ISender sender) =>
    {
      var result = await sender.Send(new CreateProjectCommand(workspaceId, request.Name, request.ImgUrl, request.File));

      return result;
    })
    .DisableAntiforgery()
    .RequireAuthorization();
  }
}
