using System.ComponentModel.DataAnnotations;

namespace backendToDoList.Dtos
{
    public class LoginUserDto
    {
        [Required(ErrorMessage = "Email is mandatory")]
        [EmailAddress(ErrorMessage = "Email format is invalid")]
        [StringLength(100)]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is mandatory")]
        [MinLength(6)]
        [StringLength(100)]
        public string Password { get; set; }
    }
}
