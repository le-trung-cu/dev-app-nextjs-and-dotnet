using Auth.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Shared.Data;

namespace Auth;

public static class AuthModule
{
  public static IServiceCollection AddAuthModule(this IServiceCollection services, IConfiguration configuration)
  {
    services.AddScoped(provider =>
    {
      var httpContext = provider.GetRequiredService<IHttpContextAccessor>().HttpContext;
      return httpContext?.User ?? new ClaimsPrincipal();
    });

    services.AddTransient<IEmailSender<User>, EmailSenderService>();
    services.AddScoped<JwtService>();

    services.AddIdentityCore<User>()
      .AddRoles<IdentityRole>()
      .AddEntityFrameworkStores<AuthDbContext>()
      .AddDefaultTokenProviders();

    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
          var jwtService = new JwtService(configuration);

          options.TokenValidationParameters = new TokenValidationParameters
          {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtService.Issuer,
            ValidAudience = jwtService.Audience,
            IssuerSigningKey = jwtService.IssuerSigningKey,
            ClockSkew = TimeSpan.Zero // For test, comment this line in product
          };
        });

    services.AddAuthorization();

    services.AddDbContext<AuthDbContext>(options =>
      options.UseNpgsql(configuration.GetConnectionString("Database")));

    return services;
  }

  public static IApplicationBuilder UseAuthModule(this IApplicationBuilder app)
  {
    app.UseAuthentication();
    app.UseAuthorization();
    app.UseMigration<AuthDbContext>();
    return app;
  }
}
