using Microsoft.AspNetCore.Mvc;
using Mission11.API.Models;

namespace Mission11.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BooksController : ControllerBase
    {
        private BookstoreContext _context;

        public BooksController(BookstoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1)
        {
            var query = _context.Books.AsQueryable();

            var totalNumBooks = query.Count();

            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                books,
                totalNumBooks
            });
        }
    }
}