using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace AppointmentManagementSystem.Server.Models
{
    public class Appointment {
        [Key]public int id_appointment {get;set;}
        required public DateTime date {get;set;}

        required public TimeSpan appointment_time{ get; set;}

        required public int id_user {get; set;}

        
    }
    public class AppointmentResponse{
        public List<TimeSpan> appointment_time {get;set;}

    }
}
