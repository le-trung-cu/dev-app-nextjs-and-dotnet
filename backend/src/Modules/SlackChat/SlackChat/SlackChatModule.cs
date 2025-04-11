using SlackChat.Hubs;

namespace SlackChat;
public static class SlackChatModule
{
public static IServiceCollection AddSlackChatModule(this IServiceCollection services, IConfiguration configuration)
  {
    // Add services to the container.
    // 1. Api Endpoint services

    // 2. Application Use Case services
    services.AddScoped<IChatMessageSender, ChatMessageSender>();
    // 3. Data - Infrastructure services
    // services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
    // services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();
    services.AddDbContext<WorkspaceDbContext>((sp, options) =>
    {
      options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());
      options.UseNpgsql(configuration.GetConnectionString("Database"));
    });

    return services;
  }

  public static IApplicationBuilder UseSlackChatModule(this IApplicationBuilder app)
  {
    return app;
  }

  public static IEndpointRouteBuilder UseSlackChatHub(this IEndpointRouteBuilder app)
  {
    app.MapHub<ChatHub>("/slack/chat/hubs").RequireCors();

    return app;
  }
}
