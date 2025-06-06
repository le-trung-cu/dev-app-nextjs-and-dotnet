using Shared.Pagination;

namespace SlackChat.Workspaces.Features.GetMessages;

public record GetMessagesQuery : PaginationWithCursorRequest<Guid?>, IQuery<GetMessagesResult>
{
  public Guid WorkspaceId { get; init; }
  public Guid? ChannelId { get; init; } = default;
  public Guid? ConversationId { get; init; }
  public Guid? ParentMessageId { get; init; } = default;
};

public class GetMessagesResult
  (bool isSuccess, Guid? cursor, int pageSize, long count, IEnumerable<MessageDto> data)
  : PaginatedWithCursorResult<MessageDto, Guid?>(cursor, pageSize, count, data)
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
    var workspace = await dbContext.Workspaces
      .AsNoTracking()
      .Where(x => x.Id == query.WorkspaceId)
      .Include(x => x.Members.Where(x => x.UserId == userId))
      .Include(x => x.Conversations.Where(c => c.Id == query.ConversationId))
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(query.WorkspaceId);

    var checkPermision = workspace.Members.FirstOrDefault(x => x.UserId == userId)
      ?? throw new BadRequestException("Unauthorized");

    if (query.ConversationId.HasValue && workspace.Conversations.Count == 0)
    {
      throw new ConversationNotFoundException(query.ConversationId.Value);
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

    if (query.Cursor.HasValue)
    {
      messagesQuery = messagesQuery.Where(x => x.Id < query.Cursor);
    }
    var count = await messagesQuery.CountAsync(cancellationToken);

    messagesQuery = messagesQuery.OrderByDescending(x => x.CreatedAt);

    var messages = await messagesQuery
      .Take(query.PageSize)
      .ToListAsync(cancellationToken);

    var result = new GetMessagesResult(true, count == 0 ? query.Cursor : messages.Last()?.Id, query.PageSize, count, messages.Adapt<IEnumerable<MessageDto>>());


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
