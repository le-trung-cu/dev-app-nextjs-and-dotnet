namespace SlackChat.Workspaces.Features.GetCurrentMember;

public class GetCurrentMemeberEndpoint : ICarterModule
{
  public void AddRoutes(IEndpointRouteBuilder app)
  {
    app.MapGet("/api/slack/workspaces/{workspaceId}/members/current",
    async (Guid workspaceId, ISender sender) =>
    {
      var result = await sender.Send(new GetCurrentMemberQuery(workspaceId));
      return result;
    }).RequireAuthorization();
  }
}
