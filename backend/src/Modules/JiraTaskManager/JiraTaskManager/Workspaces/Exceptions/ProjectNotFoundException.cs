namespace JiraTaskManager.Workspaces.Exceptions;

public class ProjectNotFoundException(Guid projectId)
  : NotFoundException("Project", projectId)
{
}
