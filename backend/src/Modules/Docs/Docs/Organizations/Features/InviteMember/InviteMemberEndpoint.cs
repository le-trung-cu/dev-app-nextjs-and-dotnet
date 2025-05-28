
namespace Docs.Organizations.Features.InviteMember;

public class InviteMemberEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPut("/api/docs/organizations/members/invite",
      async (InviteMemberCommand request, ISender sender) =>
      {
        var result = await sender.Send(request);
        return result;
      })
      .RequireAuthorization();
  }
}
