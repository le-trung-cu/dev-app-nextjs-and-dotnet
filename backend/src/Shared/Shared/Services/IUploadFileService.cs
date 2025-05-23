namespace Shared.Services;

public interface IUploadFileService
{
  Task<string> SaveFileAsync(IFormFile file, string directory, CancellationToken cancellationToken = default);
  Task<string> SaveFileAsync(IFormFile file, string directory, string fileName, CancellationToken cancellationToken = default);
}
