

namespace SlackChat.Workspaces.Features.GetChannels;

public record GetChannelsQuery(Guid WorkspaceId)
  : IQuery<GetChannelsResult>;

public record GetChannelsResult(bool IsSuccess, IEnumerable<ChannelDto> Channels);

public class GetChannelsHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user)
  : IQueryHandler<GetChannelsQuery, GetChannelsResult>
{
  public async Task<GetChannelsResult> Handle(GetChannelsQuery query, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var member = await dbContext.Members
      .AsNoTracking()
      .FirstOrDefaultAsync(x => x.WorkspaceId == query.WorkspaceId && x.UserId == userId, cancellationToken)
      ?? throw new MemberNotFoundException(query.WorkspaceId, userId);

    var channels = await dbContext.Channels
      .AsNoTracking()
      .Where(x => x.WorkspaceId == query.WorkspaceId)
      .ProjectToType<ChannelDto>()
      .ToListAsync(cancellationToken);
    
    return new GetChannelsResult(true, channels);
  }
}
