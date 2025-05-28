using System;
using System.Security.Claims;

namespace Auth.Contracts.Auth.Features.RecreateAccessToken;

public record RecreateAccessTokenCommand(List<Claim> Claims) 
  : ICommand<RecreateAccessTokenResult>;

public record RecreateAccessTokenResult(bool IsSuccess, string? AccessToken = null, DateTime? Expires = null);
