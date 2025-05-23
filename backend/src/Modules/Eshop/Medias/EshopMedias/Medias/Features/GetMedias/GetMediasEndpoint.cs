namespace EshopMedias.Medias.Features.GetMedias;

public class GetMediasEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/eshop/tenants/{tenantId}/medias", async (string tenantId, [AsParameters] PaginationRequest request, ISender sender) =>
    {
      var query = new GetMediasQuery(tenantId, request);
      var result = await sender.Send(query);
      return result;
    }).RequireAuthorization();
  }
}
