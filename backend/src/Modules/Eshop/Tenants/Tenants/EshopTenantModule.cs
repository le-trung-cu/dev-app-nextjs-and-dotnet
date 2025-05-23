using Shared.Data;

namespace Tenants;

public static class EshopTenantModule
{
  public static IServiceCollection AddEshopTenantModule(this IServiceCollection services, IConfiguration configuration)
  {
    // Add services to the container.
    // 1. Api Endpoint services

    // 2. Application Use Case services
    // 3. Data - Infrastructure services
    // services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
    // services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();
    services.AddDbContext<TenantDbContext>((sp, options) =>
    {
      options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());
      options.UseNpgsql(configuration.GetConnectionString("Database"));
    });

    return services;
  }

  public static IApplicationBuilder UseEshopTenantModule(this IApplicationBuilder app)
  {
    app.UseMigration<TenantDbContext>();
    return app;
  }
}
