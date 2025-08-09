using backendToDoList.Entities;

namespace backendToDoList.Dtos
{
    public class TaskDto
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public bool IsDone { get; set; }
        public DateTime? Deadline { get; set; }

    }
}
