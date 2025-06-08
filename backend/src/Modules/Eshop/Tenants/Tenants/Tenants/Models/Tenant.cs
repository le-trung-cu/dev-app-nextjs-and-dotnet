using Shared.Models;

namespace Tenants.Tenants.Models;

public class Tenant : Entity<Guid>
{
  public string Name { get; private set; } = default!;
  public string Slug { get; private set; } = default!;

  public Guid? ImageId { get; private set; }
  public Media? Image { get; set; }
  public string? StripeAccountId { get; set; } = default!;
  public bool StripeDetailsSubmitted { get; set; }

  private readonly List<Member> _members = [];
  public IReadOnlyList<Member> Members => _members.AsReadOnly();

  public static Tenant Create(string name, string slug, string? stripeAccountId, Media? image)
  {
    ArgumentException.ThrowIfNullOrWhiteSpace(name);
    ArgumentException.ThrowIfNullOrWhiteSpace(slug);

    var tenant = new Tenant
    {
      Name = name,
      Slug = slug,
      StripeAccountId = stripeAccountId,
      Image = image,
      StripeDetailsSubmitted = false,
    };
    return tenant;
  }
  public static Tenant Create(string name, string slug, string? stripeAccountId, Guid? imageId)
  {
    ArgumentException.ThrowIfNullOrWhiteSpace(name);
    ArgumentException.ThrowIfNullOrWhiteSpace(slug);

    var tenant = new Tenant
    {
      Name = name,
      Slug = slug,
      StripeAccountId = stripeAccountId,
      ImageId = imageId
    };
    return tenant;
  }

  public void Update(string name, string slug, string? stripeAccountId, Media? image = null)
  {
    ArgumentException.ThrowIfNullOrWhiteSpace(name);
    ArgumentException.ThrowIfNullOrWhiteSpace(slug);
    Name = name;
    Slug = slug;
    Image = image;
    StripeAccountId = stripeAccountId;
  }

  public void Update(string name, string slug, string? stripeAccountId, Guid? imageId = null)
  {
    ArgumentException.ThrowIfNullOrWhiteSpace(name);
    ArgumentException.ThrowIfNullOrWhiteSpace(slug);
    Name = name;
    Slug = slug;
    ImageId = imageId;
    StripeAccountId = stripeAccountId;
  }

  public Member AddMember(string userId, MemberRole role)
  {
    var existMember = Members.FirstOrDefault(x => x.UserId == userId);
    if (existMember != null)
    {
      existMember.UpdateRole(role);
      return existMember;
    }
    else
    {
      var newMember = new Member(Id, userId, role);
      _members.Add(newMember);
      return newMember;
    }
  }
}
