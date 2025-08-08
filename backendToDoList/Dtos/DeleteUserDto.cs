using System.ComponentModel.DataAnnotations;

namespace backendToDoList.Dtos
{
    public class DeleteUserDto
    {
        [Required(ErrorMessage = "Password is mandatory to delete account")]
        public string Password { get; set; }
    }
}
