using System;

namespace SlackChat.Workspaces.Exceptions;

public class ConversationNotFoundException(Guid conversationId) 
  : NotFoundException("Conversation", conversationId)
{

}
