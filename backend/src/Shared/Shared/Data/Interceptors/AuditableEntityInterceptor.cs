using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Shared.DDD;

namespace Shared.Data.Interceptors;

public class AuditableEntityInterceptor(IHttpContextAccessor httpContextAccessor)
  : SaveChangesInterceptor
{
  public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
  {
    UpdateEntities(eventData.Context);
    return base.SavingChanges(eventData, result);
  }

  public override async ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
  {
    UpdateEntities(eventData.Context);
    return await base.SavingChangesAsync(eventData, result, cancellationToken);
  }

  private void UpdateEntities(DbContext? context)
  {
    string userName = httpContextAccessor.HttpContext?.User.Claims
      .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value
      ?? "system";
    if (context == null) return;
    foreach (var entry in context.ChangeTracker.Entries<IEntity>())
    {
      if (entry.State == EntityState.Added)
      {
        entry.Entity.CreatedBy = userName;
        entry.Entity.CreatedAt = DateTime.UtcNow;
      }

      if (entry.State == EntityState.Added || entry.State == EntityState.Modified || entry.HasChangedOwnedEntities())
      {
        entry.Entity.LasetModifiedBy = "";
        entry.Entity.LastModified = DateTime.UtcNow;
      }
    }
  }
}

file static class Entensions
{
  public static bool HasChangedOwnedEntities(this EntityEntry entry)
  {
    // duyệt qua tất cả các thuộc tính tham chiếu
    // kiểm tra xem có thực thể "Owned Entity" nào được thay đổi hay không
    // "Owned Entity" trong EF Core là một loại thực thể không có khóa chính riêng biệt, nó thuộc về một thực thể cha.
    return entry.References.Any(r =>
      r.TargetEntry != null &&
      r.TargetEntry.Metadata.IsOwned() &&
      (r.TargetEntry.State == EntityState.Added || r.TargetEntry.State == EntityState.Modified));
  }
}
