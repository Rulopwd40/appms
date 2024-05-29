using System.ComponentModel.DataAnnotations;

namespace AppointmentManagementSystem.Server.Models
{
    public class AuthRequest
    {
        [Required] public string email { get; set; }
        [Required] public string password { get; set; }
    }
}
