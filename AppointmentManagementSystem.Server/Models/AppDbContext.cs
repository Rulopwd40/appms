using AppointmentManagementSystem.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AppointmentManagementSystem.Server.Models
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<User> User { get; set; }
        public DbSet<Appointment> Appointments { get; set;}

    }
}