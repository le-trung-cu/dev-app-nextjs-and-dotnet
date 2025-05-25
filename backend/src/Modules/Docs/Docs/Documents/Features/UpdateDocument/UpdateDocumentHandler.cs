using System;
using Docs.Documents.Exceptions;
using Shared.Contracts.CQRS;

namespace Docs.Documents.Features.UpdateDocument;

public record UpdateDocumentCommand(Guid DocumentId, string Title) : ICommand<UpdateDocumentResult>;
public record UpdateDocumentResult(bool IsSuccess);
public class UpdateDocumentHandler
  (DocumentDbContext dbContext)
  : ICommandHandler<UpdateDocumentCommand, UpdateDocumentResult>
{
  public async Task<UpdateDocumentResult> Handle(UpdateDocumentCommand command, CancellationToken cancellationToken)
  {
    var document = await dbContext.Documents
      .Where(x => x.Id == command.DocumentId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new DocumentNotFoundException(command.DocumentId);

    document.Rename(command.Title);
    await dbContext.SaveChangesAsync(cancellationToken);

    return new UpdateDocumentResult(true);
  }
}
