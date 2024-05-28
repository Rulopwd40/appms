using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Agregar la cadena de conexión y configuración de MySQL
builder.Services.AddDbContext<ADbContext>(options =>
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
            .WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Agregar servicios de controladores
builder.Services.AddControllers();

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

app.Run();