namespace Tenants.Tenants.Features.CreateTenant;

public record CreateTenantCommand(string Name, string Slug, Guid? ImageId) : ICommand<CreateTenantResult>;
public record CreateTenantResult(bool IsSuccess, TenantDto Tenant);

public class CreateTenantHandler
  (TenantDbContext dbContext, ClaimsPrincipal user, ISender sender)
  : ICommandHandler<CreateTenantCommand, CreateTenantResult>
{
  public async Task<CreateTenantResult> Handle(CreateTenantCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var tenant = Tenant.Create(command.Name, command.Slug, command.ImageId);
    tenant.AddMember(userId, MemberRole.Owner);

    dbContext.Tenants.Add(tenant);
    await dbContext.SaveChangesAsync(cancellationToken);

    return new CreateTenantResult(true, tenant.Adapt<TenantDto>());
  }
}
