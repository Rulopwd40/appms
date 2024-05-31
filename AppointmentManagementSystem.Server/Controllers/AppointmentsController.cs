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

    [HttpGet("today")]
    public IActionResult getTodayAppointments(DateTime date){

    var appointments = _context.Appointments.Where(d => d.date == date).ToList();
        if (appointments == null || appointments.Count == 0)
            {   
                return BadRequest("No hay citas disponibles para la fecha: " + date);
            }

    var appointmentResponse = appointments
            .Select(a => new AppointmentResponse {
                appointment_time = a.appointment_time
            })
            .ToList();

    return Ok(appointmentResponse);
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