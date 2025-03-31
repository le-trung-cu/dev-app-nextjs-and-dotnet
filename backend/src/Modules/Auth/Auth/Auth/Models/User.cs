namespace Auth.Auth.Models;

public class User : IdentityUser
{
  public string Name { get; set; } = default!;
}
