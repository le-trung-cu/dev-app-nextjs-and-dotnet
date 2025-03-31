using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Auth.Auth.Services;

public class JwtService(IConfiguration configuration)
{
  public readonly string Secret = configuration.GetSection("JwtSettings")["Secret"]!;
  public readonly string Issuer = configuration.GetSection("JwtSettings")["validIssuer"]!;
  public readonly string Audience = configuration.GetSection("JwtSettings")["validAudience"]!;
  public SymmetricSecurityKey IssuerSigningKey => new(Encoding.UTF8.GetBytes(Secret));
  public string CreateToken(IEnumerable<Claim> claims)
  {
    var creds = new SigningCredentials(IssuerSigningKey, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: Issuer,
        audience: Audience,
        claims: claims,
        expires: DateTime.Now.AddDays(7),
        signingCredentials: creds);

    return new JwtSecurityTokenHandler().WriteToken(token);
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
}