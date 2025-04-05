using System.Text.Json.Serialization;

namespace SlackChat.Workspaces.ValueObjects;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum MemberRole
{
  Owner,
  Member
}
