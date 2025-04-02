using JiraTaskManager.Workspaces.Exceptions;
using JiraTaskManager.Workspaces.ValueObjects;
using Shared.DDD;

namespace JiraTaskManager.Workspaces.Models;

public class Workspace : Aggregate<Guid>
{
  public string Name { get; private set; } = default!;
  public string? ImgUrl { get; private set; }

  private readonly List<Member> _members = [];
  private readonly List<Project> _projects = [];
  private readonly List<TaskItem> _tasks = [];

  public IReadOnlyList<Member> Members => _members.AsReadOnly();
  public IReadOnlyList<Project> Projects => _projects.AsReadOnly();
  public IReadOnlyList<TaskItem> Tasks => _tasks.AsReadOnly();

  private Workspace(string name, string? imgUrl)
  {
    Name = name;
    ImgUrl = imgUrl;
  }
  public static Workspace Create(string userId, string name, string? imgUrl)
  {
    ArgumentException.ThrowIfNullOrWhiteSpace(userId);
    ArgumentException.ThrowIfNullOrWhiteSpace(name);
    var workspace = new Workspace(name, imgUrl);
    workspace.AddMember(userId, MemberRole.Owner);

    return workspace;
  }

  public void UpdateImgUrl(string imgUrl)
  {
    ImgUrl = imgUrl;
  }

  public Member AddMember(string userId, MemberRole role)
  {
    var exists = Members.Any(x => x.UserId == userId);
    if (exists)
    {
      throw new BadRequestException("This user is already registered as a member.");
    }

    var member = new Member(Id, userId, role);
    _members.Add(member);

    return member;
  }

  public Member RemoveMember(string userId)
  {
    var member = Members.FirstOrDefault(x => x.UserId == userId)
      ?? throw new MemberNotFoundException(Id, userId);

    if (member.Role == MemberRole.Owner)
    {
      var otherOwner = Members.FirstOrDefault(x => x.Role == MemberRole.Owner && x.UserId != userId)
        ?? throw new BadRequestException("Can not remove this owner user");
    }

    _members.Remove(member);

    return member;
  }

  public Project AddProject(string name, string? imgUrl)
  {
    ArgumentException.ThrowIfNullOrWhiteSpace(name);
    if (_projects.Any(x => x.Name == name))
    {
      throw new BadRequestException($"Project's Name was exist");
    }
    if (string.IsNullOrWhiteSpace(imgUrl))
    {
      imgUrl = null;
    }
    var project = new Project(Id, name, imgUrl);
    _projects.Add(project);

    return project;
  }

  public Project UpdateProject(Guid projectId, string name, string? imgUrl)
  {
    ArgumentException.ThrowIfNullOrWhiteSpace(name);

    var project = _projects.FirstOrDefault(x => x.Id == projectId)
      ?? throw new ProjectNotFoundException(projectId);

    if (string.IsNullOrWhiteSpace(imgUrl))
    {
      imgUrl = null;
    }
    project.Update(name, imgUrl);

    return project;
  }

  public Project RemoveProject(Guid projectId)
  {
    var project = _projects.FirstOrDefault(x => x.Id == projectId)
      ?? throw new ProjectNotFoundException(projectId);

    _projects.Remove(project);

    return project;
  }

  public TaskItem AddTask(Guid? projectId, string? assigneeId, string name, TaskItemStatus status, DateTime? endDate, string? description)
  {
    ArgumentException.ThrowIfNullOrWhiteSpace(name);
    Guid? memberId = null;
    if (assigneeId != null)
    {
      var assignee = _members.FirstOrDefault(x => x.UserId == assigneeId)
        ?? throw new MemberNotFoundException(assigneeId);
      memberId = assignee.Id;
    }
    var task = new TaskItem(Id, projectId, memberId, name, status, endDate, description);

    _tasks.Add(task);

    return task;
  }

  public TaskItem UpdateTask(Guid taskId, Guid? projectId, string? assigneeId, string name, TaskItemStatus status, DateTime? endDate, string? description)
  {
    ArgumentException.ThrowIfNullOrWhiteSpace(name);
    Guid? memberId = null;
    if (assigneeId != null)
    {
      var assignee = _members.FirstOrDefault(x => x.UserId == assigneeId)
        ?? throw new MemberNotFoundException(assigneeId);
      memberId = assignee.Id;
    }
    if (projectId.HasValue)
    {
      var project = _projects.FirstOrDefault(x => x.Id == projectId.Value)
      ?? throw new ProjectNotFoundException(projectId.Value);
    }

    var task = _tasks.FirstOrDefault(x => x.Id == taskId) ?? throw new TaskItemNotFoundException(taskId);

    task.Update(projectId, memberId, name, status, endDate, description);

    return task;
  }

  public TaskItem RemoveTask(Guid taskId)
  {
    var task = _tasks.FirstOrDefault(x => x.Id == taskId) ?? throw new TaskItemNotFoundException(taskId);

    _tasks.Remove(task);

    return task;
  }
}
