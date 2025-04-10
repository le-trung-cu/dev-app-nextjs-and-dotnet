

namespace SlackChat.Workspaces.Features.GetChannel;

public record GetChannelQuery(Guid WorkspaceId, Guid ChannelId)
  : IQuery<GetChannelResult>;

public record GetChannelResult(bool IsSuccess, ChannelDto Channel);

public class GetChannelHandler
  (WorkspaceDbContext dbContext, ClaimsPrincipal user)
  : IQueryHandler<GetChannelQuery, GetChannelResult>
{
  public async Task<GetChannelResult> Handle(GetChannelQuery query, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var member = await dbContext.Members.AsNoTracking()
      .Where(x => x.UserId == userId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new BadRequestException("Unauthorized");

    var workspace = await dbContext.Workspaces.AsNoTracking()
      .Where(x => x.Id == query.WorkspaceId)
      .Include(x => x.Channels.Where(t => t.Id == query.ChannelId).Take(1))
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new WorkspaceNotFoundException(query.WorkspaceId);

    if(workspace.Channels.Count == 0)
    {
      throw new ChannelNotFoundException(query.ChannelId);
    }

    var channel = workspace.Channels[0];
    
    return new GetChannelResult(true, channel.Adapt<ChannelDto>());
  }
}
