namespace SlackChat.Workspaces.Exceptions;

public class MessageNotFoundException(Guid messageId) : NotFoundException("Message", messageId)
{

}
