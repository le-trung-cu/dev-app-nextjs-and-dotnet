namespace SlackChat.Hubs;

public interface IChatMessageSender
{
  Task NewMessage(MessageDto message);
}
