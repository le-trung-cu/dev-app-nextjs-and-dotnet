
using Microsoft.AspNetCore.Http;

namespace SlackChat.Workspaces.Features.CreateMessage;

public record CreateMessageRequest
{
  public string Body {get; set;} = default!;
  public IFormFile? Image {get;set;}
  public Guid? ParentMessageId { get; set; }
  public Guid? ConversationId { get; set; }
  public Guid? ChannelId { get; set; }
}

public class CreateMessageEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/slack/workspaces/{workspaceId}/messages",
    async (Guid workspaceId, [FromForm] CreateMessageRequest request, ISender sender) => {
      var command = new CreateMessageCommand(workspaceId,  request.ChannelId, request.Body, request.Image, request.ParentMessageId, request.ConversationId);
      var result = await sender.Send(command);
      return result;
    }).RequireAuthorization()
    .DisableAntiforgery();
  }
}
