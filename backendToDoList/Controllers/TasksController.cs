using Microsoft.AspNetCore.Mvc;

namespace backendToDoList.Controllers
{
    public class TasksController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
