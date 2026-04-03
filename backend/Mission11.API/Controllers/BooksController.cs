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
        public IActionResult GetBooks(
            int pageSize = 5,
            int pageNum = 1,
            [FromQuery] List<string>? categories = null)
        {
            var query = _context.Books.AsQueryable();

            if (categories is not null && categories.Any())
            {
                query = query.Where(b => categories.Contains(b.Category));
            }

            var totalNumBooks = query.Count();

            var books = query
                .OrderBy(b => b.Title)
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                books,
                totalNumBooks
            });
        }

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            var categories = _context.Books
                .Select(b => b.Category)
                .Where(c => !string.IsNullOrWhiteSpace(c))
                .Distinct()
                .OrderBy(c => c)
                .ToList();

            return Ok(categories);
        }

        [HttpPost]
        public IActionResult AddBook([FromBody] Book? book)
        {
            if (book == null)
            {
                return BadRequest();
            }

            book.BookId = 0;
            _context.Books.Add(book);
            _context.SaveChanges();
            return Ok(book);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book book)
        {
            var existing = _context.Books.Find(id);
            if (existing == null)
            {
                return NotFound();
            }

            existing.Title = book.Title;
            existing.Author = book.Author;
            existing.Publisher = book.Publisher;
            existing.Isbn = book.Isbn;
            existing.Classification = book.Classification;
            existing.Category = book.Category;
            existing.PageCount = book.PageCount;
            existing.Price = book.Price;

            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var existing = _context.Books.Find(id);
            if (existing == null)
            {
                return NotFound();
            }

            _context.Books.Remove(existing);
            _context.SaveChanges();
            return NoContent();
        }
    }
}