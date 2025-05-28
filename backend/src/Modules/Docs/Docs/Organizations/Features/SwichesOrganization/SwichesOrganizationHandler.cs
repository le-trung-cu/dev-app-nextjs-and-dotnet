using Auth.Contracts.Auth.Features.RecreateAccessToken;

namespace Docs.Organizations.Features.SwichesOrganization;

public record SwichesOrganizationCommand(Guid? OrganizationId)
  : ICommand<SwichesOrganizationResult>;

public record SwichesOrganizationResult(bool IsSuccess, string? AccessToken = null);

public class SwichesOrganizationHandler
  (DocumentDbContext dbContext, ClaimsPrincipal user, ISender sender)
  : ICommandHandler<SwichesOrganizationCommand, SwichesOrganizationResult>
{
  public async Task<SwichesOrganizationResult> Handle(SwichesOrganizationCommand command, CancellationToken cancellationToken)
  {
    if (!command.OrganizationId.HasValue)
    {
      var _recreateCommand = new RecreateAccessTokenCommand([
                              new(ClaimsPrincipalExtentions.AppDocsOrganizationId,string.Empty)
                            ]);
      var _result = await sender.Send(_recreateCommand, cancellationToken);
        if (!_result.IsSuccess)
        {
          return new SwichesOrganizationResult(false);
        }

        return new SwichesOrganizationResult(true, _result.AccessToken);
    }

    var userId = user.GetUserId();
    var organization = dbContext.Organizations
      .AsNoTracking()
      .Where(x => x.Id == command.OrganizationId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new OrganizationNotFoundException(command.OrganizationId.Value);

    var member = dbContext.Members
      .AsNoTracking()
      .Where(x => x.OrganizationId == command.OrganizationId && x.UserId == userId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new MemberNotFoundException(command.OrganizationId.Value, userId);
    var recreateCommand = new RecreateAccessTokenCommand([
                            new(
                              ClaimsPrincipalExtentions.AppDocsOrganizationId,
                              command.OrganizationId.Value.ToString()
                            )]);

    var result = await sender.Send(recreateCommand, cancellationToken);
    if (!result.IsSuccess)
    {
      return new SwichesOrganizationResult(false);
    }

    return new SwichesOrganizationResult(true, result.AccessToken);
  }
}
