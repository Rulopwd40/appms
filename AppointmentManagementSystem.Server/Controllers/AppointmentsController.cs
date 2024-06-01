using AppointmentManagementSystem.Server.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;

[ApiController]
[Microsoft.AspNetCore.Mvc.Route("api/[controller]")]

public class AppointmentsController : ControllerBase{
    private readonly AppDbContext _context;

    public AppointmentsController(AppDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
    {
        return await _context.Appointments.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<AppointmentPost>> PostAppointment(AppointmentPost appointmentPost){
         // Obtener Id Usuario
    var user_id = _context.User
                  .Where(d => d.username == appointmentPost.username)
                  .Select(d => d.id_user)  // Selecciona solo el ID
                  .FirstOrDefault();

    if (user_id == 0)
    {
        return BadRequest("Usuario no encontrado.");
    }

    // Nuevo Appointment
    var newAppointment = new Appointment
    {
        date = appointmentPost.date,
        appointment_time = appointmentPost.appointment_time,
        id_user = user_id,
    };
    _context.Appointments.Add(newAppointment);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetAppointments), new { id = newAppointment.id_appointment }, newAppointment);
    }


    [HttpGet("today")]
    public IActionResult getTodayAppointments(DateTime date){

     var appointments = _context.Appointments.Where(d => d.date == date).ToList();

    var appointmentResponse = appointments
        .Select(a => new AppointmentResponse {
            appointment_time = a.appointment_time
        })
        .ToList();

    return Ok(appointmentResponse.Count > 0 ? appointmentResponse : new List<AppointmentResponse>());
    }
    
    [HttpGet("user")]
    public IActionResult getUserAppointments(string username){
        var user = _context.User.Where( u => u.username == username ).FirstOrDefault();
        if(user == null){
            return NotFound("Usuario No existe");
        }
        var appointments = _context.Appointments.Where(d => d.id_user == user.id_user).ToList();
        if(appointments == null || appointments.Count==0){
            return BadRequest("No hay citas disponibles para el usuario: " + username);
        }
        return Ok(appointments);
    }
}