using System;
using Shared.Exceptions;

namespace Docs.Documents.Exceptions;

public class DocumentNotFoundException(Guid id) : NotFoundException("Document", id)
{
}