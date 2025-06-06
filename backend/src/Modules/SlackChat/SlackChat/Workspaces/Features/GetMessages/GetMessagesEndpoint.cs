using Microsoft.AspNetCore.Http;
using Shared.Pagination;

namespace SlackChat.Workspaces.Features.GetMessages;

public record GetMessagesRequest
  (Guid? Cursor, int? PageIndex, int PageSize, Guid? ChannelId,  Guid? ParentMessageId, Guid? ConversationId)
  : PaginationWithCursorRequest<Guid?>(Cursor, PageIndex, PageSize)
{
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
        Cursor = request.Cursor,
        PageIndex = request.PageIndex,
        PageSize = request.PageSize
      };
      var result = await sender.Send(command);

      return result;
    });
  }
}
