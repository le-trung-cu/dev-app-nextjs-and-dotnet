namespace Shared.DDD;

public abstract class Aggregate<TId> : Entity<TId>, IAggregate<TId>
{
  private readonly List<IDomainEvent> _domainEvents = [];
  public IReadOnlyList<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

  public void AddDomainEvent(IDomainEvent domainEvent)
  {
    this._domainEvents.Add(domainEvent);
  }

  public IDomainEvent[] ClearDomainEvents()
  {
    var dequeueEvents = _domainEvents.ToArray();
    _domainEvents.Clear();
    return dequeueEvents;
  }


}
