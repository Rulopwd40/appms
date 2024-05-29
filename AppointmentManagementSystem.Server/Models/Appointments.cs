using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace AppointmentManagementSystem.Server.Models
{
    public class Appointment {
        [Key] public int id_appointment {get;set;}
        required public DateTime date {get;set;}

        required public string appointment_time{ get; set;}

        required public string state { get; set;}

        required public int id_user {get; set;}

        required public int slots_id_slots{ get; set;}
        
    }
}