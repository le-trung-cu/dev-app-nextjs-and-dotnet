namespace JiraTaskManager.Workspaces.Exceptions;

public class TaskItemNotFoundException(Guid taskId)
  : NotFoundException("TaskItem", taskId)
{

}
