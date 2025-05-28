using System;

namespace Docs.Organizations.Features.InviteMemberApprove;

public class InviteMemberApproveEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapPut("/api/docs/organizations/members/invite-approve",
      (InviteMemberApproveCommand request, ISender sender) =>
      {
        var result = sender.Send(request);
        return result;
      })
      .RequireAuthorization();
  }
}
