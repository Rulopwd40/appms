using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using AppointmentManagementSystem.Server.Models;
using AppointmentManagementSystem.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Agregar la cadena de conexión y configuración de MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 26))
    )
);

// Permite agregar origenes de los cuales recibir peticiones
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularHost",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Agregar servicios de controladores
builder.Services.AddControllers();

// Agregar AppointmentService y ScheduledAppointmentService
builder.Services.AddScoped<AppointmentService>();
builder.Services.AddHostedService<ScheduledAppointmentService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseRouting();

// Se lo agrega a la App
app.UseCors("AngularHost");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

// Ejecutar la actualización al iniciar
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var appointmentService = services.GetRequiredService<AppointmentService>();
        appointmentService.UpdatePastAppointmentsAsync().Wait();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while updating past appointments.");
    }
}

app.Run();