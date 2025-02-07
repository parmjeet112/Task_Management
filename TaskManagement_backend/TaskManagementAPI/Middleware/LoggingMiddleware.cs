namespace TaskManagementAPI.Middleware;

public class LoggingMiddleware : IMiddleware
{
    private readonly ILogger<LoggingMiddleware> _logger;

    public LoggingMiddleware(ILogger<LoggingMiddleware> logger)
    {
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        _logger.LogInformation($"Incoming Request: {context.Request.Method} {context.Request.Path}");
        await next(context);
        _logger.LogInformation($"Outgoing Response: {context.Response.StatusCode}");
    }
}