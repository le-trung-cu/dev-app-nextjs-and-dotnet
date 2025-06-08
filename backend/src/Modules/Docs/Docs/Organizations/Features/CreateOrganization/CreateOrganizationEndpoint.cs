using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace Docs.Organizations.Features.CreateOrganization;

public record CreateOrganizationRequest
{
  public string? Name { get; set; }
  public string? Slug { get; set; }
  public IFormFile? File { get; set; }
}

public class CreateOrganizationEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPost("/api/docs/organizations", async ([FromForm] CreateOrganizationRequest request, ISender sender) =>
    {

      var result = await sender.Send(new CreateOrganizationCommand(request.Name, request.Slug, request.File));
      return result;
    })
    .RequireAuthorization()
    .DisableAntiforgery();
  }
}
