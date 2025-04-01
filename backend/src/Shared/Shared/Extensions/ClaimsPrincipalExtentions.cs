using System.Security.Claims;
using Shared.Exceptions;

namespace Shared.Extensions;

public static class ClaimsPrincipalExtentions
{
  public static string? GetUserId(this ClaimsPrincipal principal)
  {
    return principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
  }

  public static string GetUserIdOrThrow(this ClaimsPrincipal principal)
  {
    var userId = principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value
      ?? throw new BadRequestException("userId not found in ClaimsPrincipal");

    return userId;
  }
}
