using Microsoft.AspNetCore.SignalR;

namespace SlackChat.Hubs;

public class ChatMessageSender(IHubContext<ChatHub> hubContext) : IChatMessageSender
{
  public async Task NewMessage(MessageDto message)
  {
    var channel = $"slack:{message.WorkspaceId}:messages";
    await hubContext.Clients.Group(message.WorkspaceId.ToString())
      .SendAsync(channel, message);
  }

  public async Task UpdateMessage(MessageDto message)
  {
    var channel = $"slack:{message.WorkspaceId}:messages:update";
    await hubContext.Clients.Group(message.WorkspaceId.ToString())
      .SendAsync(channel, message);
  }
}
