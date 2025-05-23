using System.Security.Claims;
using Docs.Data;
using Docs.Documents.Models;
using Shared.Contracts.CQRS;
using Shared.Extensions;

namespace Docs.Documents.Features.CreateDocument;

public record CreateDocumentCommand
  (string Title, string? InitialContent)
  : ICommand<CreateDocumentResult>;

public record CreateDocumentResult (bool IsSuccess, Guid DocumentId);

public class CreateDocumentHandler
  (DocumentDbContext dbContext, ClaimsPrincipal user)
  : ICommandHandler<CreateDocumentCommand, CreateDocumentResult>
{
  public async Task<CreateDocumentResult> Handle(CreateDocumentCommand command, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var document = Document.Create(command.Title, userId, command.InitialContent);
    await dbContext.SaveChangesAsync(cancellationToken);
    return new CreateDocumentResult(true, document.Id);
  }
}
