using backendToDoList.Data;
using backendToDoList.Dtos;
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
            new TaskDto
            {
                Title = task.Title,
                Description = task.Description,
                IsDone = task.IsDone,
                Deadline = task.Deadline,
            }).ToList();

            return Ok(tasksToFrontend);
        }
    }
}
