using System;
using EshopMedias.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Shared.Data;
using Microsoft.EntityFrameworkCore;

namespace EshopMedias;

public static class EshopMediaModule
{
 public static IServiceCollection AddEshopMediaModule(this IServiceCollection services, IConfiguration configuration)
  {
    // Add services to the container.
    // 1. Api Endpoint services

    // 2. Application Use Case services
    // 3. Data - Infrastructure services
    // services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
    // services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();
    services.AddDbContext<MediaDbContext>((sp, options) =>
    {
      options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());
      options.UseNpgsql(configuration.GetConnectionString("Database"));
    });

    return services;
  }

  public static IApplicationBuilder UseEshopMediaModule(this IApplicationBuilder app)
  {
    app.UseMigration<MediaDbContext>();
    return app;
  }
}
