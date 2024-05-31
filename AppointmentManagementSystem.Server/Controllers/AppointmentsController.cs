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
    public IActionResult getTodayAppointments(string username,string date){
        if (string.IsNullOrEmpty(date))
            {
                return BadRequest("Fecha no proporcionada.");
            }

    DateTime parsedDate;
        if (!DateTime.TryParse(date, out parsedDate))
            {
            return BadRequest("Formato de fecha no válido: " + date);
            }
    User user = (User)_context.User.Where( u => u.username == username );
    var appointments = _context.Appointments.Where(d => d.date == parsedDate && d.id_user == user.id_user).ToList();
        if (appointments == null || appointments.Count == 0)
            {   
                return BadRequest("No hay citas disponibles para la fecha: " + date);
            }

    var appointmentResponse = new AppointmentResponse
    {
        appointment_time = appointments.Select(a => a.appointment_time).ToList()
    };
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