using System;
using System.Security.Claims;
using Docs.Documents.Dtos;
using Docs.Documents.Exceptions;
using Mapster;
using Shared.Contracts.CQRS;
using Shared.Extensions;

namespace Docs.Documents.Features.GetDocumentById;

public record GetDocumentByIdQuery(Guid DocumentId) : IQuery<GetDocumentByIdResult>;

public record GetDocumentByIdResult(bool IsSuccess, DocumentDto Document);

public class GetDocumentByIdHandler
  (DocumentDbContext dbContext, ClaimsPrincipal user) : IQueryHandler<GetDocumentByIdQuery, GetDocumentByIdResult>
{
  public async Task<GetDocumentByIdResult> Handle(GetDocumentByIdQuery query, CancellationToken cancellationToken)
  {
    var userId = user.GetUserId();
    var document = await dbContext.Documents
      .Where(x => x.Id == query.DocumentId)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new DocumentNotFoundException(query.DocumentId);

    return new GetDocumentByIdResult(true, document.Adapt<DocumentDto>());
  }
}
