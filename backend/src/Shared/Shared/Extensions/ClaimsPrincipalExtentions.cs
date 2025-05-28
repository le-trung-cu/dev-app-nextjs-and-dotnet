using System.Security.Claims;
using Shared.Exceptions;

namespace Shared.Extensions;

public static class ClaimsPrincipalExtentions
{
  public static readonly string AppDocsOrganizationId = "app_docs_organization";

  public static bool IsSuperAdmin(this ClaimsPrincipal principal)
  {
    return principal.IsInRole("Administrator");
  }

  public static string GetUserId(this ClaimsPrincipal principal)
  {
    return principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value!;
  }

  public static Guid? GetAppDocsOrganizationId(this ClaimsPrincipal principal)
  {
    var id = principal.Claims.FirstOrDefault(x => x.Type == AppDocsOrganizationId)?.Value!;
    if (Guid.TryParse(id, out Guid guid))
    {
      return guid;
    }
    return null;
  }
}
