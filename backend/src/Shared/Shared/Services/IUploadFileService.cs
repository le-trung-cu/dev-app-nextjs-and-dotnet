namespace Shared.Services;

public interface IUploadFileService
{
  Task<string> SaveFileAsync(IFormFile file, string directory, CancellationToken cancellationToken = default);
}
