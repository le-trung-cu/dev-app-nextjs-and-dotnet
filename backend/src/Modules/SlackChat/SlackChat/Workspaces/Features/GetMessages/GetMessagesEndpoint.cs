using Microsoft.AspNetCore.Http;
using Shared.Pagination;

namespace SlackChat.Workspaces.Features.GetMessages;

public record GetMessagesRequest : PaginationRequest
{
  public Guid? ChannelId { get; set; } = default;
  public Guid? ConversationId { get; set; } = default;
  public Guid? ParentMessageId { get; set; } = default;
}

public class GetMessagesEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/slack/workspaces/{workspaceId}/messages",
    async (Guid workspaceId, [AsParameters] GetMessagesRequest request, ISender sender) =>
    {
      var command = new GetMessagesQuery
      {
        WorkspaceId = workspaceId,
        ChannelId = request.ChannelId,
        ConversationId = request.ConversationId,
        ParentMessageId = request.ParentMessageId,
        PageIndex = request.PageIndex,
        PageSize = request.PageSize
      };
      var result = await sender.Send(command);

      return result;
    });
  }
}
