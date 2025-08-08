using System.ComponentModel.DataAnnotations;

namespace backendToDoList.Entities
{
    public class Task
    {
        public int Id { get; set; }
        public int UserId { get; set; }  // FK to User
        public User User { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public bool IsDone { get; set; }
        public DateTime? Deadline { get; set; }

        
    }

}
