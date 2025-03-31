using Resend;

namespace Shared.Extensions;

public static class ResendExtentions
{
  public static IServiceCollection AddResendClient(this IServiceCollection services, IConfiguration configuration)
  {
    services.AddHttpClient<ResendClient>();
    services.Configure<ResendClientOptions>(options =>
    {
      options.ApiToken = configuration["Resend:ApiToken"]
        ?? throw new Exception("Resend ApiToken is required");
    });
    
    services.AddTransient<IResend, ResendClient>();

    return services;
  }
}
