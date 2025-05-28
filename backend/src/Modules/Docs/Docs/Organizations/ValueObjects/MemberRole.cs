using System.Text.Json.Serialization;

namespace Docs.Organizations.ValueObjects;


[JsonConverter(typeof(JsonStringEnumConverter))]
public enum MemberRole
{
  Admin,
  Member
}
