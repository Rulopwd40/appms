using System.ComponentModel.DataAnnotations;

namespace AppointmentManagementSystem.Server.Models{
    public class Slots{
        [Key] public int id_slot { get; set;}
        public DateTime slot_time { get;}

        public bool is_available {get; set;}
    }
}

