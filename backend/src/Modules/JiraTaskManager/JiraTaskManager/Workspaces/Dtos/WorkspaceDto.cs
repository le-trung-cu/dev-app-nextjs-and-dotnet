namespace JiraTaskManager.Workspaces.Dtos;

public record WorkspaceDto(
  Guid Id,
  string Name,
  string ImgUrl,
  IEnumerable<ProjectDto> Projects
);

public record WorkspaceItemDto(
  Guid Id,
  string Name,
  string ImgUrl
);
