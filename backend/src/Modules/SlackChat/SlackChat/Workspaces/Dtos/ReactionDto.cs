namespace SlackChat.Workspaces.Dtos;

public record ReactionDto(
  Guid Id,
  string Value
);

public record ReactionCount(
  Guid MessageId,
  string Value,
  int Count,
  IEnumerable<Guid> MemberIds
);
