using Shared.DDD;

namespace JiraTaskManager.Workspaces.Models;

public class Project : Entity<Guid>
{
  public string Name { get; private set; } = default!;
  public string? ImgUrl { get; private set; }

  public Guid WorkspaceId {get;private set;}

  internal Project(Guid workspaceId, string name, string? imgUrl)
  {
    WorkspaceId = workspaceId;
    Name = name;
    ImgUrl = imgUrl;
  }

  public void Update(string name, string? imgurl)
  {
    Name = name;
    ImgUrl = imgurl;
  }

  public void UpdateImgUrl(string imgUrl)
  {
    ImgUrl = imgUrl;
  }
}
