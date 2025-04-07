using Shared.Exceptions;

namespace Auth.Auth.Exceptions;

public class UserNotFoundException(string userId) : NotFoundException("User", userId)
{

}
