using Microsoft.AspNetCore.SignalR;

namespace SlackChat.Hubs;

public class ChatHub : Hub
{
  public override async Task OnConnectedAsync()
  {
    var httpContext = Context.GetHttpContext()!;
    var workspaceId = httpContext.Request.Query["workspaceId"];
    await Groups.AddToGroupAsync(Context.ConnectionId, workspaceId!);
    await base.OnConnectedAsync();
  }
}
