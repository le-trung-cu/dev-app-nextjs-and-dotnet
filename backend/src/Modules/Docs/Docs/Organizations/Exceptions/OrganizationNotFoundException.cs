using System;
using Shared.Exceptions;

namespace Docs.Organizations.Exceptions;

public class OrganizationNotFoundException(Guid organizationId) : NotFoundException("Organization", organizationId)
{

}
