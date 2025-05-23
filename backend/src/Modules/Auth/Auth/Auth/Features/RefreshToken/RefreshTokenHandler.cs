
using Auth.Data;
using Shared.Extensions;

namespace Auth.Auth.Features.RefreshToken;

public record RefreshTokenCommand(string AccessToken, string RefreshToken, string? DeviceId) : ICommand<RefreshTokenResult>;

public record RefreshTokenResult(bool IsSuccess, string? AccessToken = null, DateTime? Expires = null);

public class RefreshTokenHandler
  (UserManager<User> _userContext, AuthDbContext dbContext, JwtService _tokenService)
  : ICommandHandler<RefreshTokenCommand, RefreshTokenResult>
{
  public async Task<RefreshTokenResult> Handle(RefreshTokenCommand tokenApiModel, CancellationToken cancellationToken)
  {
    string accessToken = tokenApiModel.AccessToken;
    var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
    var userId = principal.GetUserId();
    var user = await _userContext.Users.SingleOrDefaultAsync(u => u.Id == userId, cancellationToken);
    if (user is null)
    {
      return new RefreshTokenResult(false);
    }
    var provider = string.IsNullOrWhiteSpace(tokenApiModel.DeviceId) ? "COMMON" : tokenApiModel.DeviceId;

    var refreshToken = await dbContext.Set<AppUserToken>()
      .AsNoTracking()
      .FirstOrDefaultAsync(x => x.UserId == userId && x.LoginProvider == provider && x.Name == "REFRESH_TOKEN", cancellationToken);
    
    if(refreshToken == null || refreshToken.ExpiredAt <= DateTime.Now)
    {
      return new RefreshTokenResult(false);
    }


    var (newAccessToken, expires) = _tokenService.CreateToken(principal.Claims);

    return new RefreshTokenResult(true, newAccessToken, expires);
  }
}
