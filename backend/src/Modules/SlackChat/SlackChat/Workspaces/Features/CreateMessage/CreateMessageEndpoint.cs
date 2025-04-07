
using Microsoft.AspNetCore.Http;

namespace SlackChat.Workspaces.Features.CreateMessage;

public record CreateMessageRequest
{
  public string Body {get; set;} = default!;
  public IFormFile? Image {get;set;}
  public Guid? ParentMessageId { get; set; }
}

public class CreateMessageEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/slack/workspaces/{workspaceId}/channels/{channelId}/messages",
    async (Guid workspaceId, Guid channelId, [FromForm] CreateMessageRequest request, ISender sender) => {
      var command = new CreateMessageCommand(workspaceId,  channelId, request.Body, request.Image, request.ParentMessageId);
      var result = await sender.Send(command);
      return result;
    }).RequireAuthorization()
    .DisableAntiforgery();
  }
}
