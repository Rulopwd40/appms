using AppointmentManagementSystem.Server.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

[ApiController]
[Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
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

    [HttpPost("login")]
    public IActionResult LoginUser(AuthRequest model)
    {
        var user = _context.User.Where(d => d.email == model.email  && d.password == model.password).FirstOrDefault();
        if(user == null) return BadRequest("Email or password wrong");
        else return Ok(new UserResponse
            {
                username = user.username,
                name = user.name,
                lastname = user.lastname,
                is_admin = user.is_admin
            });
    }
}