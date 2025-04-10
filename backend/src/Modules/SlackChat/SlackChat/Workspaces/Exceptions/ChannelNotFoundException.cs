namespace SlackChat.Workspaces.Exceptions;

public class ChannelNotFoundException(Guid channelId) : NotFoundException("Channel", channelId)
{

}
