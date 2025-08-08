using backendToDoList.Data;
using backendToDoList.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backendToDoList.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class LoginController : Controller
    {
        private readonly ToDoListDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public LoginController(ToDoListDbContext context, IConfiguration configuration)
        {
            _dbContext = context;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginUserDto req)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(User => User.Email == req.Email);

            if (user is null) return NotFound("Credentials are incorrect!");
            if (!BCrypt.Net.BCrypt.Verify(req.Password, user.Password)) return BadRequest("Credentials are incorrect!");

            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.UtcNow.AddHours(2); 

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            var tokenHandler = new JwtSecurityTokenHandler();
            return Ok(new { token = tokenHandler.WriteToken(token) });

        }
    }
}
