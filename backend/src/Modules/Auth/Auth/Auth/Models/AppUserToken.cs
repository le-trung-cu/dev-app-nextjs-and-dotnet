namespace Auth.Auth.Models;

public class AppUserToken : IdentityUserToken<string>
{
  public string? DeviceName { get; set; }
  public DateTime? ExpiredAt { get; set; }
}
