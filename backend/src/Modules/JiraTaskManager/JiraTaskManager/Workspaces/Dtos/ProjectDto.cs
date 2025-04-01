namespace JiraTaskManager.Workspaces.Dtos;

public record ProjectDto(
  Guid Id,
  string Name,
  string ImgUrl
);
