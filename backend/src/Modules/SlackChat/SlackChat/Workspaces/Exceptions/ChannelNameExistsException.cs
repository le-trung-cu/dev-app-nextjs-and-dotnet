namespace SlackChat.Workspaces.Exceptions;

public class ChannelNameExistsException(string name)
  : BadRequestException($"Chanel name ({name}) was exists in the workspace")
{
}
