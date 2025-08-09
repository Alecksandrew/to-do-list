namespace backendToDoList.Dtos
{
    public class CreateTaskDto
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public bool IsDone { get; set; } = false;
        public DateTime? Deadline { get; set; }
    }
}
