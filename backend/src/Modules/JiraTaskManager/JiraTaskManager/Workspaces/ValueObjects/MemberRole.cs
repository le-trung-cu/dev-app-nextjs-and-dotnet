using System.Text.Json.Serialization;

namespace JiraTaskManager.Workspaces.ValueObjects;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum MemberRole
{
  Owner,
  Member
}
