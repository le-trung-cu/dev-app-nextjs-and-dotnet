using Shared.Pagination;

namespace SlackChat.Workspaces.Features.GetMessages;

public record GetMessagesQuery : PaginationWithCursorRequest<Guid?>, IQuery<GetMessagesResult>
{
  public Guid WorkspaceId { get; init;}
  public Guid? ChannelId { get; init;} = default;
  public Guid? ConversationId { get; init; } = default;
  public Guid? ParentMessageId { get; init; } = default;
};

public class GetMessagesResult
  (bool isSuccess, Guid? cursor, int pageSize, long count, IEnumerable<MessageDto> data)
  : PaginatedWithCursorResult<MessageDto, Guid?>( cursor, pageSize, count, data)
{
  public bool IsSuccess { get; set; } = isSuccess;
  public IEnumerable<ReactionCount> ReactionCounts { get; set; } = [];
  public IEnumerable<MessageChildren> Threads { get; set; } = [];
};

public class GetMessagesHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user)
  : IQueryHandler<GetMessagesQuery, GetMessagesResult>
{
  public async Task<GetMessagesResult> Handle(GetMessagesQuery query, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var member = await dbContext.Members.AsNoTracking()
      .Where(x => x.WorkspaceId == query.WorkspaceId && x.UserId == userId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new BadRequestException("Unauthorized");

    var conversationId = query.ConversationId;
    Message? parentMessage = null;
    if (!query.ConversationId.HasValue && !query.ChannelId.HasValue && query.ParentMessageId.HasValue)
    {
      parentMessage = await dbContext.Messages.AsNoTracking()
        .Where(x => x.Id == query.ParentMessageId)
        .FirstOrDefaultAsync(cancellationToken)
        ?? throw new MessageNotFoundException(query.ParentMessageId.Value);
      conversationId = parentMessage.ConversationId;
    }

    var messagesQuery = dbContext.Messages
      .AsNoTracking()
      .Where(x => x.WorkspaceId == query.WorkspaceId);

    if (query.ChannelId.HasValue)
    {
      messagesQuery = messagesQuery.Where(x => x.ChannelId == query.ChannelId);
    }
    messagesQuery = messagesQuery.Where(x => x.ParentMessageId == query.ParentMessageId);
    if (query.ConversationId.HasValue)
    {
      messagesQuery = messagesQuery.Where(x => x.ConversationId == query.ConversationId);
    }

    if(query.Cursor.HasValue)
    {
      messagesQuery = messagesQuery.Where(x => x.Id < query.Cursor);
    }
    var count = await messagesQuery.CountAsync(cancellationToken);

    messagesQuery = messagesQuery.OrderByDescending(x => x.CreatedAt);

    var messages = await messagesQuery
      .Take(query.PageSize)
      .ToListAsync(cancellationToken);

    var result = new GetMessagesResult(true, count == 0? query.Cursor : messages.Last()?.Id, query.PageSize, count, messages.Adapt<IEnumerable<MessageDto>>());


    var messageIds = messages.Select(x => x.Id);

    var reactions = await dbContext.Reactions
      .AsNoTracking()
      .Where(x => messageIds.Contains(x.MessageId))
      .GroupBy(x => new { x.MessageId, x.Value })
      .Select(x => new ReactionCount(x.Key.MessageId, x.Key.Value, x.Count(), x.Select(x => x.MemberId)))
      .ToListAsync(cancellationToken);

    result.ReactionCounts = reactions;

    var threads = await dbContext.Messages
      .AsNoTracking()
      .Where(x => messageIds.Contains(x.ParentMessageId!.Value))
      .GroupBy(x => x.ParentMessageId)
      .Select(g => new MessageChildren(g.Key!.Value, g.Count(), g.Max(x => x.CreatedAt)))
      .ToListAsync(cancellationToken);
    result.Threads = threads;

    return result;
  }
}
