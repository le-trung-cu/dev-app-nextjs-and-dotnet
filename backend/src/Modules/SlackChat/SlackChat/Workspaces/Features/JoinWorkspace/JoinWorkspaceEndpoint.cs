namespace SlackChat.Workspaces.Features.JoinWorkspace;

public record JoinWorkspaceRequest(string InviteCode);

public class JoinWorkspaceEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/slack/join/{workspaceId}", async (
      Guid workspaceId,
      JoinWorkspaceRequest request,
      ISender sender) =>
    {
      var result = await sender.Send(new JoinWorkspaceCommand(workspaceId, request.InviteCode));
      return result;
    }).RequireAuthorization();
  }
}
