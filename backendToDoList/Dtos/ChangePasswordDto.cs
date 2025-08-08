using System.ComponentModel.DataAnnotations;

namespace backendToDoList.Dtos
{
    public class ChangePasswordDto
    {
        [Required(ErrorMessage = "Current password is mandatory")]
        public string CurrentPassword { get; set; }

        [Required(ErrorMessage = "New password is mandatory")]
        [MinLength(6)]
        [StringLength(100)]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "Confirm new password is mandatory")]
        [Compare("NewPassword", ErrorMessage = "New passwords do not match")]
        public string ConfirmNewPassword { get; set; }
    }
}
