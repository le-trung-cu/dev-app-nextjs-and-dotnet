namespace SlackChat.Workspaces.Dtos;

public record WorkspaceDto(
  Guid Id,
  string Name,
  string ImgUrl,
  string InviteToken
);

public record WorkspaceItemDto(
  Guid Id,
  string Name,
  string ImgUrl,
   string InviteToken
);
