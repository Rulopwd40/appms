using AppointmentManagementSystem.Server.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

[ApiController]
[Microsoft.AspNetCore.Mvc.Route("api/[controller]")]

public class SlotsController : ControllerBase{
    private readonly AppDbContext _context;

    public SlotsController(AppDbContext context)
    {
        _context = context;
    }

}