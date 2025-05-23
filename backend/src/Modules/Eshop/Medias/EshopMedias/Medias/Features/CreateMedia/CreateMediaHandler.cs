

namespace EshopMedias.Medias.Features.CreateMedia;

public class CreateMediaHandler
  (MediaDbContext dbContext, IUploadFileService fileService)
  : ICommandHandler<CreateMediaCommand, CreateMediaResult>
{
  public async Task<CreateMediaResult> Handle(CreateMediaCommand command, CancellationToken cancellationToken)
  {
    var directory = Path.Combine("uploads", "eshop");
    var mediaId = Guid.NewGuid();
    var path = await fileService.SaveFileAsync(command.File, directory, command.File.FileName, cancellationToken);
    var media = Media.Create(mediaId, command.TenantId, command.File.FileName, command.Alt, path);
    dbContext.Medias.Add(media);
    await dbContext.SaveChangesAsync(cancellationToken);

    return new CreateMediaResult(true, media);
  }
}
