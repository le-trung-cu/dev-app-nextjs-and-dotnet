namespace Shared.DDD;

public class Entity<T> : Entity, IEntity<T>
{
  public T Id { get; set; } = default!;
}

public class Entity : IEntity
{
  public DateTime? CreatedAt { get; set; }
  public string? CreatedBy { get; set; }
  public DateTime? LastModified { get; set; }
  public string? LasetModifiedBy { get; set; }
}
