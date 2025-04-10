
namespace SlackChat.Workspaces.Features.CreateChannel;

public record CreateChannelRequest(string Name);

public class CreateChannelEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/slack/workspaces/{workspaceId}/channels",
    async (Guid workspaceId, CreateChannelRequest request, ISender sender) =>
    {
      var result = await sender.Send(new CreateChannelCommand(workspaceId, request.Name));
      return result;
    });
  }
}
