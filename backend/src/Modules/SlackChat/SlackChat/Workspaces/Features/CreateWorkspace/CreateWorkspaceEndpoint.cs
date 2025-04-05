namespace SlackChat.Workspaces.Features.CreateWorkspace;

public record CreateWorkspaceRequest
{
  public string? Name { get; set; }
}

public class CreateWorkspaceEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/slack/workspaces", async ( CreateWorkspaceRequest request, ISender sender) =>
    {
      var result = await sender.Send(new CreateWorkspaceCommand(request.Name!));

      return result;
    })
    .DisableAntiforgery()
    .RequireAuthorization();
  }
}
