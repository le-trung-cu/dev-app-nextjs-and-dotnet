using Microsoft.AspNetCore.Http;
using Shared.Contracts.CQRS;
using Shared.Models;

namespace EshopMedias.Contracts.Medias.Features.CreateMedia;

public record CreateMediaCommand(Guid TenantId, string Alt, IFormFile File)
  : ICommand<CreateMediaResult>;

public record CreateMediaResult(bool IsSuccess, Media Media);
