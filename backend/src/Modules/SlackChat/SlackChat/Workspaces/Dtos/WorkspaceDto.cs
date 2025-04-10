namespace SlackChat.Workspaces.Dtos;

public record WorkspaceDto(
  Guid Id,
  string Name,
  string InviteToken
);

public record WorkspaceItemDto(
  Guid Id,
  string Name,
  string InviteToken
);

public record WorkspaceInfoDto(
  Guid Id,
  string Name
);
