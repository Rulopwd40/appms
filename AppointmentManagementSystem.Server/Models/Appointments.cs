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
    public class AppointmentPost{
        required public DateTime date {get;set;}

        required public TimeSpan appointment_time{ get; set;}

        required public string username {get; set;}
    }
    public class AppointmentResponse{
        public TimeSpan appointment_time{get;set;}

    }

    public class UserAppointment{
         required public DateTime date {get;set;}

        required public TimeSpan appointment_time{ get; set;}
    }

    public class AppointmentUserResponse{
        required public TimeSpan appointment_time{get;set;}
        required public string name{get;set;}
        required public string lastname{get;set;}
    }
}
