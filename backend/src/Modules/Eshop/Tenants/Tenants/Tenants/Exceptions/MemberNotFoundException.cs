using System;

namespace Tenants.Tenants.Exceptions;

public class MemberNotFoundException(Guid tenantId, string userId) : NotFoundException($"Entity \"Member\" ({tenantId}, {userId}) was not found.")
{
}
