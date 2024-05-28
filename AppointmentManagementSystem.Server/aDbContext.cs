using Microsoft.EntityFrameworkCore;

public class ADbContext(DbContextOptions<ADbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
}

public class User
{
    public int id_user { get; set; }
    public required string username { get; set; }
    public required string password { get; set; }

    public required string name{ get; set;}

    public required string lastname{ get ; set;}

    public required int is_admin{ get ; set; }

    public required string email{ get ; set; }
    
}