using System.ComponentModel.DataAnnotations;

namespace AppointmentManagementSystem.Server.Models
{
    public class User
    {
        [Key] public int id_user { get; set; }
        public required string username { get; set; }
        public required string password { get; set; }

        public required string name { get; set; }

        public required string lastname { get; set; }

        public required bool is_admin { get; set; }

        public required string email { get; set; }

    }

    public class UserResponse
    {
        public string username { get; set; }
        public string name { get; set; }
        public string lastname { get; set; }
        public bool is_admin { get; set; }
    }

    public class ChangePasswordRequest
    {
        public string username {get;set;}
        public string password {get;set;}
    }
}
