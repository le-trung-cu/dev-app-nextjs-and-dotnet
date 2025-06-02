using System;
using Docs.Organizations.Exceptions;
using Docs.Organizations.ValueObjects;
using Shared.DDD;
using Shared.Exceptions;

namespace Docs.Organizations.Models;

public class Organization : Aggregate<Guid>
{
  public string Name { get; set; } = default!;
  public string Slug { get; set; } = default!;
  public string? ImgUrl { get; set; } = default!;

  private readonly List<Member> _members = [];
  public IReadOnlyList<Member> Members => _members.AsReadOnly();

  public static Organization Create(string userId, string name, string slug, string? imgUrl)
  {
    ArgumentException.ThrowIfNullOrWhiteSpace(userId);
    ArgumentException.ThrowIfNullOrWhiteSpace(name);
    ArgumentException.ThrowIfNullOrWhiteSpace(slug);

    var organization = new Organization
    {
      Name = name,
      ImgUrl = imgUrl,
      Slug = slug,
    };
    var admin = new Member(organization.Id, userId, MemberRole.Admin);
    admin.ApproveInvite();
    organization._members.Add(admin);
    
    return organization;
  }

  public void UpdateImgUrl(string imgUrl)
  {
    ImgUrl = imgUrl;
  }

  public Member InviteMember(string userId, MemberRole role)
  {
    var exists = Members.FirstOrDefault(x => x.UserId == userId);
    if (exists != null)
    {
      if (exists.IsJoined)
      {
        throw new BadRequestException("This user is already registered as a member.");
      }
      exists.UpdateRole(role);

      return exists;
    }

    var member = new Member(Id, userId, role);
    _members.Add(member);

    return member;
  }

  public Member ApproveInvite(string userId)
  {
    var member = _members.FirstOrDefault(x => x.UserId == userId)
      ?? throw new MemberNotFoundException(Id, userId);

    if (member.IsJoined)
    {
      throw new BadRequestException("This user is already joined as a member");
    }

    member.ApproveInvite();
    return member;
  }

  public Member RemoveMember(string userId)
  {
    var member = Members.FirstOrDefault(x => x.UserId == userId)
      ?? throw new MemberNotFoundException(Id, userId);

    if (member.Role == MemberRole.Admin)
    {
      var otherOwner = Members.FirstOrDefault(x => x.Role == MemberRole.Admin && x.UserId != userId)
        ?? throw new BadRequestException("Can not remove this Admin user");
    }

    _members.Remove(member);

    return member;
  }
}
