namespace Docs;

public static class DocumentModule
{
    public static IServiceCollection AddDocumentModule(this IServiceCollection services, 
        IConfiguration configuration)
    {
        // Add services to the container.
        // 1. Api Endpoint services

        // 2. Application Use Case services

        // 3. Data - Infrastructure services
        var connectionString = configuration.GetConnectionString("Database");

        // services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
        // services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();

        services.AddDbContext<DocumentDbContext>((sp, options) =>
        {
            options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());
            options.UseNpgsql(connectionString);
        });
        //TODO: uncomment for out box processor
        // services.AddHostedService<OutboxProcessor>();

        return services;
    }

    public static IApplicationBuilder UseDocumentModule(this IApplicationBuilder app)
    {
        // Configure the HTTP request pipeline.
        // 1. Use Api Endpoint services

        // 2. Use Application Use Case services

        // 3. Use Data - Infrastructure services
        app.UseMigration<DocumentDbContext>();

        return app;
    }
}
