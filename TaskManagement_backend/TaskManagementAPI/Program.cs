using Microsoft.EntityFrameworkCore;
using Serilog;
using TaskManagementAPI.Data;
using TaskManagementAPI.Middleware;
using TaskManagementAPI.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog for Logging
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("Logs/log.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();
builder.Host.UseSerilog();

// Add services to the container
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database Connection
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Middlewares
builder.Services.AddScoped<ExceptionHandlingMiddleware>();
builder.Services.AddScoped<LoggingMiddleware>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();


var app = builder.Build();

// Middleware Configuration
app.UseMiddleware<LoggingMiddleware>();
app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowAllOrigins");

app.UseAuthorization();
app.MapControllers();

app.Run();