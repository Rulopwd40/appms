using AppointmentManagementSystem.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AppointmentManagementSystem.Server.Models
{
    public class ADbContext(DbContextOptions<ADbContext> options) : DbContext(options)
    {
        public DbSet<User> User { get; set; }


    }
}