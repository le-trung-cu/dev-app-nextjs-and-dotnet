using Auth;
using Carter;
using JiraTaskManager;
using SlackChat;
using Shared.Exceptions.Handler;
using Shared.Extensions;
using Shared.Services;
using Catalog;
using Tenants;
using Catalog.Products.Models;
using Shared.Messaging.Extensions;
using Basket;
using Ordering;
using EshopMedias;
using Docs;

var builder = WebApplication.CreateBuilder(args);
// Disable HTTPS redirection
builder.Services.AddHttpsRedirection(options =>
{
    options.HttpsPort = null;
});
// Add services to the container.
builder.Services.AddResendClient(builder.Configuration);
builder.Services.AddSignalR();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.CustomSchemaIds(type =>
    {
        return type.Namespace?.Replace("SlackChat.", "SC.")
           .Replace("JiraTaskManager.", "JTM.") + "." + type.Name;
    });
});
builder.Services.AddHttpContextAccessor();
builder.Services.AddExceptionHandler<CustomExceptionHandler>();
builder.Services.AddScoped<IUploadFileService, UploadFileService>();

var authAssembly = typeof(AuthModule).Assembly;
var jiraAssembly = typeof(JiraTaskManagerModule).Assembly;
var slackAssembly = typeof(SlackChatModule).Assembly;
var documentAssembly = typeof(DocumentModule).Assembly;
/*Eshop*/
var mediaAssembly = typeof(EshopMediaModule).Assembly;
var tenantAssembly = typeof(EshopTenantModule).Assembly;
var catalogAssembly = typeof(CatalogModule).Assembly;
var basketAssembly = typeof(BasketModule).Assembly;
var orderingAssembly = typeof(OrderingModule).Assembly;

builder.Services
    .AddAuthModule(builder.Configuration)
    .AddJiraTaskManagerModule(builder.Configuration)
    .AddSlackChatModule(builder.Configuration)
    .AddDocumentModule(builder.Configuration)
/*Eshop*/
    .AddEshopMediaModule(builder.Configuration)
    .AddEshopTenantModule(builder.Configuration)
    .AddEshopCatalogModule(builder.Configuration)
    .AddBasketModule(builder.Configuration)
    .AddOrderingModule(builder.Configuration);

builder.Services.AddMediatRWithAssemblies(
    authAssembly,
    jiraAssembly,
    slackAssembly,
    documentAssembly,
    /*Eshop*/
    mediaAssembly,
    tenantAssembly,
    catalogAssembly,
    basketAssembly,
    orderingAssembly
    );
builder.Services.AddCarterAssemblies(
    authAssembly,
    jiraAssembly,
    slackAssembly,
    documentAssembly,
    /*Eshop*/
    mediaAssembly,
    tenantAssembly,
    catalogAssembly,
    basketAssembly,
    orderingAssembly
    );

builder.Services.AddMassTransitWithAssemblies(
    builder.Configuration,
    tenantAssembly,
    catalogAssembly,
    basketAssembly,
    orderingAssembly
    );

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});


var app = builder.Build();
// Configure the HTTP request pipeline.
if (true || app.Environment.IsDevelopment())
{
    app.UseCors();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler(options => { });
app.UseStaticFiles();
app.UseAuthModule()
    .UseJiraTaskManagerModule()
    .UseSlackChatModule()
    .UseDocumentModule()
    .UseEshopMediaModule()
    .UseEshopTenantModule()
    .UseEshopCatalogModule()
    .UseBasketModule();

app.UseSlackChatHub();

// app.UseHttpsRedirection();

app.MapCarter();
app.Run();
