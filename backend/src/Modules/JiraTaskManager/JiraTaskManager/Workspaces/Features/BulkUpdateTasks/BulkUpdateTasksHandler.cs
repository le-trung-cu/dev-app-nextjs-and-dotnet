namespace JiraTaskManager.Workspaces.Features.BulkUpdateTasks;

public record BulkUpdateTaskItemDto(
  Guid Id,
  TaskItemStatus Status,
  int Position
);

public record BulkUpdateTasksCommand(
  Guid WorkspaceId,
  IEnumerable<BulkUpdateTaskItemDto> Tasks
) : ICommand<BulkUpdateTasksResult>;

public record BulkUpdateTasksResult(bool IsSuccess);

public class BulkUpdateTasksHandler
  (WorkspaceDbContext dbContext)
  : ICommandHandler<BulkUpdateTasksCommand, BulkUpdateTasksResult>
{
  public async Task<BulkUpdateTasksResult> Handle(BulkUpdateTasksCommand command, CancellationToken cancellationToken)
  {
    var taskIds = command.Tasks.Select(x => x.Id);

    var tasks = await dbContext.TaskItems
      .Where(x => x.WorkspaceId == command.WorkspaceId && taskIds.Contains(x.Id))
      .ToListAsync(cancellationToken);

    var dictTasks = command.Tasks.ToDictionary(x => x.Id, x => x);

    foreach(var task in tasks)
    {
      var dictitem = dictTasks[task.Id];
      task.UpdatePosition(dictitem.Position);
      task.UpdateStatus(dictitem.Status);
    }

    await dbContext.SaveChangesAsync(cancellationToken);

    return new BulkUpdateTasksResult(true);
  }
}
