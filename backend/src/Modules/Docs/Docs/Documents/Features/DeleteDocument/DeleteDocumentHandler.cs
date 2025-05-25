using System;
using Docs.Documents.Exceptions;
using Shared.Contracts.CQRS;

namespace Docs.Documents.Features.DeleteDocument;

public record DeleteDocumentCommand(Guid DocumentId) : ICommand<DeleteDocumentResult>;

 
public record DeleteDocumentResult(bool IsSuccess);

public class DeleteDocumentHandler
  (DocumentDbContext dbContext)
  : ICommandHandler<DeleteDocumentCommand, DeleteDocumentResult>
{
  public async Task<DeleteDocumentResult> Handle(DeleteDocumentCommand command, CancellationToken cancellationToken)
  {
    var document = await dbContext.Documents.Where(x => x.Id == command.DocumentId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new DocumentNotFoundException(command.DocumentId);

    dbContext.Documents.Remove(document);
    await dbContext.SaveChangesAsync(cancellationToken);

    return new DeleteDocumentResult(true);
  }
}
