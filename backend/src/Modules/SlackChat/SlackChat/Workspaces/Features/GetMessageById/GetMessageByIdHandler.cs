namespace SlackChat.Workspaces.Features.GetMessageById;

public record GetMessageByIdQuery(Guid WorkspaceId, Guid MessageId) : IQuery<GetMessageByIdResult>;

public class GetMessageByIdResult(bool isSuccess, MessageDto message)
{
  public bool IsSuccess { get; set; } = isSuccess;
  public MessageDto Message { get; set; } = message;
  public IEnumerable<ReactionCount> Reactions { get; set; } = [];
  public MessageChildren? Threads { get; set; }
};

public class GetMessageByIdHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user)
  : IQueryHandler<GetMessageByIdQuery, GetMessageByIdResult>
{
  public async Task<GetMessageByIdResult> Handle(GetMessageByIdQuery query, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var member = await dbContext.Members.AsNoTracking()
      .Where(x => x.WorkspaceId == query.WorkspaceId && x.UserId == userId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new BadRequestException("Unauthorized");

    var message = await dbContext.Messages
      .AsNoTracking()
      .Where(x => x.Id == query.MessageId && x.WorkspaceId == query.WorkspaceId)
      .ProjectToType<MessageDto>()
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new MessageNotFoundException(query.MessageId);

    var result = new GetMessageByIdResult(true, message);

    var reactions = await dbContext.Reactions
      .AsNoTracking()
      .Where(x => x.MessageId == query.MessageId)
      .GroupBy(x => x.Value)
      .Select(x => new ReactionCount(query.MessageId, x.Key, x.Count(), x.Select(x => x.MemberId)))
      .ToListAsync(cancellationToken);
      
    result.Reactions = reactions;

    var threads = await dbContext.Messages
      .AsNoTracking()
      .Where(x => x.ParentMessageId == query.MessageId)
      .GroupBy(x => x.ParentMessageId)
      .Select(g => new MessageChildren(g.Key!.Value, g.Count(), g.Max(x => x.CreatedAt)))
      .FirstOrDefaultAsync(cancellationToken);
    result.Threads = threads!;

    return result;
  }
}
