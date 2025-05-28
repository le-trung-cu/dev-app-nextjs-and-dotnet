using Auth.Contracts.Auth.Features.RecreateAccessToken;
using Shared.Extensions;

namespace Auth.Auth.Features.RecreateAccessToken;

public class RecreateAccessTokenHandler
  (JwtService _tokenService, ClaimsPrincipal _claimsPrincipal)
  : ICommandHandler<RecreateAccessTokenCommand, RecreateAccessTokenResult>
{
  public async Task<RecreateAccessTokenResult> Handle(RecreateAccessTokenCommand command, CancellationToken cancellationToken)
  {
    foreach (var item in command.Claims)
    {
      if (item.Type != ClaimsPrincipalExtentions.AppDocsOrganizationId)
      {
        return new RecreateAccessTokenResult(false);
      }
    }
    var addedClaims = command.Claims.Select(x => x.Type);

    var claims = _claimsPrincipal.Claims
                  .Where(x => x.Type != "aud")
                  .Where(x => !addedClaims.Contains(x.Type))
                  .Concat(command.Claims.Where(x => !string.IsNullOrWhiteSpace(x.Value)));
  
    var (newAccessToken, expires) = _tokenService.CreateToken(claims);

    return new RecreateAccessTokenResult(true, newAccessToken, expires);
  }
}
