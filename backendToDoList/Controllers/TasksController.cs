using backendToDoList.Data;
using backendToDoList.Dtos;
using backendToDoList.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backendToDoList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : Controller
    {
        public readonly ToDoListDbContext _dbContext;

        public TasksController(ToDoListDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetTasks()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            List<Entities.Task> tasks = await _dbContext.Tasks.Where(task => task.UserId == int.Parse(userId)).ToListAsync();

            List<TaskDto> tasksToFrontend = tasks.Select(task =>
            TaskMapper.ToTaskDto(task)).ToList();

            return Ok(tasksToFrontend);
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateTask(CreateTaskDto req)
        {
            if (req.Title == null || req.Title == String.Empty) return BadRequest("It is missing title of the task");

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            Entities.Task newTask = TaskMapper.ToTaskEntity(req, int.Parse(userId));

            await _dbContext.Tasks.AddAsync(newTask);
            
            await _dbContext.SaveChangesAsync();

            return Ok(TaskMapper.ToTaskDto(newTask));

        }
    }
}
