using System;
using System.Text.Json.Serialization;

namespace Tenants.Contracts.Tenants.ValueObjects;



[JsonConverter(typeof(JsonStringEnumConverter))]
public enum MemberRole
{
  Owner,
  Member
}
