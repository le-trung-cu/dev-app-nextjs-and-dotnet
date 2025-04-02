using System.Text.Json.Serialization;

namespace JiraTaskManager.Workspaces.ValueObjects;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TaskItemStatus
{
  Backlog,
  Todo,
  InProgress,
  InReview,
  Done
}
