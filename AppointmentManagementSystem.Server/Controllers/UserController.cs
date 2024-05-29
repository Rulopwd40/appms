using AppointmentManagementSystem.Server.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ADbContext _context;

    public UserController(ADbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsuarios()
    {
        return await _context.User.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<User>> PostUsuario(User user)
    {
        _context.User.Add(user);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetUsuarios), new { id = user.id_user }, user);
    }
}