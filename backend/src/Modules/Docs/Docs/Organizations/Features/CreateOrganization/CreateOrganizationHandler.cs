namespace Docs.Organizations.Features.CreateOrganization;

public record CreateOrganizationCommand(string Name, string Slug, IFormFile? File = null)
  : ICommand<CreateOrganizationResult>;

public record CreateOrganizationResult(bool IsSuccess, Guid OrganizationId);

public class CreateOrganizationHandler
  (DocumentDbContext dbContext, ClaimsPrincipal user, IUploadFileService fileService)
  : ICommandHandler<CreateOrganizationCommand, CreateOrganizationResult>
{
  public async Task<CreateOrganizationResult> Handle(CreateOrganizationCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();

    var organization = Organization.Create(userId, command.Name, command.Slug, null);

    if (command.File != null)
    {
      var imgUrl = await fileService.SaveFileAsync(command.File, Path.Combine("docs", "uploads", "organizations"), cancellationToken);
      organization.UpdateImgUrl(imgUrl);
    }

    dbContext.Organizations.Add(organization);
    await dbContext.SaveChangesAsync(cancellationToken);

    return new CreateOrganizationResult(true, organization.Id);
  }
}
