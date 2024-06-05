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
    public ActionResult<IEnumerable<Appointment>> GetAppointments()
    {
        var appointments = _context.Appointments
        .Join(
            _context.User,
            appointment => appointment.id_user,
            user => user.id_user,
            (appointment, user) => new AllAppointmentsResponse
            {
                id_appointment = appointment.id_appointment,
                date = appointment.date,
                appointment_time = appointment.appointment_time,
                username = user.username,
            })
        .ToList();

        return Ok(appointments.Count > 0 ? appointments : new List<AllAppointmentsResponse>());
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
        state= true,
    };
    _context.Appointments.Add(newAppointment);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetAppointments), new { id = newAppointment.id_appointment }, newAppointment);
    }


[HttpGet("today")]
public IActionResult getTodayAppointments(DateTime date)
{
    var appointments = _context.Appointments
        .Where(d => d.date == date && d.state == true)
        .Join(
            _context.User,
            appointment => appointment.id_user,
            user => user.id_user,
            (appointment, user) => new AppointmentUserResponse
            {
                appointment_time = appointment.appointment_time,
                name = user.name,
                lastname = user.lastname
            }
        )
        .ToList();

    return Ok(appointments.Count > 0 ? appointments : new List<AppointmentUserResponse>());
}
    [HttpGet("user")]
    public IActionResult getUserAppointments(string username){
        var user = _context.User.Where( u => u.username == username ).FirstOrDefault();
        if(user == null){
            return NotFound("Usuario No existe");
        }
        var appointments = _context.Appointments.Where(d => d.id_user == user.id_user && d.state).ToList();
        if(appointments == null || appointments.Count==0){
            return Ok(appointments);
        }
        return Ok(appointments);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteAppointment([FromQuery] DateTime date, [FromQuery] TimeSpan appointment_time)
    {
        try
        {
            var appointment = await _context.Appointments
                .FirstOrDefaultAsync(a => a.date == date && a.appointment_time == appointment_time);

            if (appointment == null)
            {
                return NotFound(new { message = "Appointment not found" });
            }

            appointment.state = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            // Log the exception (not shown here)
            return StatusCode(500, new { message = "An error occurred while processing your request.", details = ex.Message });
        }
    }
}
;