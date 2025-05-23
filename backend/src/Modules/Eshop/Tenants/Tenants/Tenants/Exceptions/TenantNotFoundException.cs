namespace Tenants.Tenants.Exceptions;

public class TenantNotFoundException : NotFoundException
{
  public TenantNotFoundException(Guid id)
        : base("Tenant", id)
  {
  }
  public TenantNotFoundException(string slug)
      : base("Tenant", slug)
  {
  }
}
