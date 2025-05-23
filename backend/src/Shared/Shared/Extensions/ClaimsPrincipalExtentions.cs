using System.Security.Claims;
using Shared.Exceptions;

namespace Shared.Extensions;

public static class ClaimsPrincipalExtentions
{
  public static string GetUserId(this ClaimsPrincipal principal)
  {
    return principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value!;
  }

  public static bool IsSuperAdmin(this ClaimsPrincipal principal)
  {
    return principal.IsInRole("Administrator");
  }
}
