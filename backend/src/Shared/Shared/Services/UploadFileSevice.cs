namespace Shared.Services;

public class UploadFileSevice(IWebHostEnvironment webHostEnvironment)
  : IUploadFileService
{
  public async Task<string> SaveFileAsync(IFormFile file, string directory, CancellationToken cancellationToken = default)
  {
    var rootPath = webHostEnvironment.WebRootPath;
    var dateFolder = DateTime.UtcNow.ToString("yyyy-MM-dd");
    var uploadPath = Path.Combine(rootPath, directory, dateFolder);

    Directory.CreateDirectory(uploadPath);

    var fileExtension = Path.GetExtension(file.FileName);
    var fileName = string.Concat(Guid.NewGuid(), fileExtension);
    var filePath = Path.Combine(uploadPath, fileName);

    await using var stream = new FileStream(filePath, FileMode.Create);
    await file.CopyToAsync(stream, cancellationToken);

    // Tạo đường dẫn URL chuẩn (dùng '/' thay vì '\')
    var fileUrl = Path.Combine("/",directory, dateFolder, fileName).Replace("\\", "/");
    return fileUrl;
  }
}