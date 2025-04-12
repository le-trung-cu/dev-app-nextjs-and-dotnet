using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using RT.Comb;

namespace Shared.Data;

public class SequentialGuidValueGenerator : ValueGenerator<Guid>
{
  private static readonly ICombProvider _provider = Provider.PostgreSql;
  public override bool GeneratesTemporaryValues => false;

  public override Guid Next(EntityEntry entry) => _provider.Create();
}
