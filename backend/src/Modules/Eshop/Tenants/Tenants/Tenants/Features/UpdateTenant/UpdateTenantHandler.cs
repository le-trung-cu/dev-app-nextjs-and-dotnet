
namespace Tenants.Tenants.Features.UpdateTenant;

public record UpdateTenantCommand(Guid Id, string Name, string Slug, Guid? ImageId)
  : ICommand<UpdateTenantResult>;

public record UpdateTenantResult(bool IsSuccess);

public class UpdateTenantHandler
  (TenantDbContext dbContext, ISender sender, ClaimsPrincipal user)
  : ICommandHandler<UpdateTenantCommand, UpdateTenantResult>
{
  public async Task<UpdateTenantResult> Handle(UpdateTenantCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var member = await sender.Send(new GetMemberQuery(command.Id, userId), cancellationToken);

    var tenant = await dbContext.Tenants
      .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken)
      ?? throw new TenantNotFoundException(command.Id);

    tenant.Update(command.Name, command.Slug, command.ImageId);

    await dbContext.SaveChangesAsync(cancellationToken);

    return new UpdateTenantResult(true);
  }
}
