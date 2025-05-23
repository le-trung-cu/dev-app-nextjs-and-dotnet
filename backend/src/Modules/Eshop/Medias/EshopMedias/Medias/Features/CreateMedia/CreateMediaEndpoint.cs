using Microsoft.AspNetCore.Mvc;

namespace EshopMedias.Medias.Features.CreateMedia;

public record CreateMediaRequest(Guid TenantId, string Alt, IFormFile File);

public class CreateMediaEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/eshop/medias", async ([FromForm] CreateMediaRequest request, ISender sender) =>
    {
      var result = await sender.Send(new CreateMediaCommand(request.TenantId, request.Alt, request.File));
      return result;
    })
    .RequireAuthorization()
    .DisableAntiforgery();
  }
}
