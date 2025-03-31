using System.Reflection;
using Carter;

namespace Shared.Extensions;

public static class CarterExtentions
{
  public static IServiceCollection AddCarterAssemblies(this IServiceCollection services, params Assembly[] assemblies)
  {
    services.AddCarter(configurator: cfg =>
    {
      var modules = assemblies
        .SelectMany(x => x.GetTypes().Where(x => x.IsAssignableTo(typeof(ICarterModule))))
        .ToArray();

      cfg.WithModules(modules);
    });

    return services;
  }
}
