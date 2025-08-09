using backendToDoList.Dtos;

namespace backendToDoList.Mappers
{
    public static class TaskMapper
    {
        public static Entities.Task ToTaskEntity(CreateTaskDto task, int userId)
        {
            Entities.Task taskEntity = new Entities.Task
            {
                Title = task.Title,
                UserId = userId,
                Description = task.Description,
                IsDone = false, //a task always is created and it is not done
                Deadline = task.Deadline,
            };

            return taskEntity;
        }

        public static TaskDto ToTaskDto(Entities.Task task)
        {
            TaskDto taskDto = new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                IsDone = task.IsDone,
                Deadline = task.Deadline,
            };

            return taskDto;
        }

    }
}
