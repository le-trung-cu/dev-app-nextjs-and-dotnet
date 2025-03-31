namespace Auth.Contracts.Auth.Dtos;

public record UserDto(
  string Id,
  string Email,
  string Name,
  bool EmailConfirmed,
  IEnumerable<string> Roles
);

public record UserItemDto(
  string Id,
  string Email,
  string Name);