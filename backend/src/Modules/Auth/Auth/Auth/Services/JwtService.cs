using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Auth.Auth.Services;

public class JwtService(IConfiguration configuration)
{
  public readonly string Secret = configuration.GetSection("JwtSettings")["Secret"]!;
  public readonly string Issuer = configuration.GetSection("JwtSettings")["validIssuer"]!;
  public readonly string Audience = configuration.GetSection("JwtSettings")["validAudience"]!;
  public SymmetricSecurityKey IssuerSigningKey => new(Encoding.UTF8.GetBytes(Secret));
  public (string token, DateTime expires) CreateToken(IEnumerable<Claim> claims)
  {
    var creds = new SigningCredentials(IssuerSigningKey, SecurityAlgorithms.HmacSha256);
    var  expires = DateTime.Now.AddDays(10);
    var token = new JwtSecurityToken(
        issuer: Issuer,
        audience: Audience,
        claims: claims,
        // expires: DateTime.Now.AddDays(7),
        expires: expires,
        signingCredentials: creds);

    return (new JwtSecurityTokenHandler().WriteToken(token), expires);
  }

  public async Task<List<Claim>> GetClaimsAsync(UserManager<User> userManager, User user)
  {
    var roles = await userManager.GetRolesAsync(user);
    List<Claim> claims = [
      new(ClaimTypes.NameIdentifier, user.Id),
    ];
    foreach (var role in roles)
    {
      claims.Add(new(ClaimTypes.Role, role));
    }
    return claims;
  }

  public List<Claim> GetClaims(User user, IEnumerable<string>? roles = null)
  {
    List<Claim> claims = [
      new(ClaimTypes.NameIdentifier, user.Id),
    ];
    if (roles != null)
    {

      foreach (var role in roles)
      {
        claims.Add(new(ClaimTypes.Role, role));
      }
    }
    return claims;
  }

  public string GenerateRefreshToken()
  {
    var randomNumber = new byte[32];
    using var rng = RandomNumberGenerator.Create();
    rng.GetBytes(randomNumber);
    return Convert.ToBase64String(randomNumber);
  }

  public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
  {
    TokenValidationParameters tokenValidationParameters = new()
    {
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateLifetime = false,  //here we are saying that we don't care about the token's expiration date
      ValidateIssuerSigningKey = true,
      ValidIssuer = Issuer,
      ValidAudience = Audience,
      IssuerSigningKey = IssuerSigningKey,
    };

    var tokenHandler = new JwtSecurityTokenHandler();
    SecurityToken securityToken;
    var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
    var jwtSecurityToken = securityToken as JwtSecurityToken;
    if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
      throw new SecurityTokenException("Invalid token");
    return principal;
  }
}