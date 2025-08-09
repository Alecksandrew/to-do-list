using backendToDoList.Data;
using backendToDoList.Dtos;
using backendToDoList.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backendToDoList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly ToDoListDbContext _dbContext;


        public UsersController(ToDoListDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpPost]
        public async Task<IActionResult> CreateUser(CreateUserDto req)
        {
            var hasAlreadyAccount = await _dbContext.Users.FirstOrDefaultAsync(user => user.Email == req.Email);

            if (hasAlreadyAccount != null) return BadRequest("User has already an account");

            User newUser = new User
            {
                Email = req.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(req.Password),
            };

            await _dbContext.Users.AddAsync(newUser);

            await _dbContext.SaveChangesAsync();

            return CreatedAtRoute("GetUser", new { id = newUser.Id }, newUser);
        }
    }
}
