import { useEffect, useMemo, useState } from "react";
import type { Book } from "../types/Book";
import { useCart } from "../context/CartContext";

const apiBaseUrl = "http://localhost:4000";

interface BookListProps {
  selectedCategories: string[];
}

function BookList({ selectedCategories }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortAsc, setSortAsc] = useState(true);
  const [notice, setNotice] = useState("");
  const [apiError, setApiError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const categoryParams = selectedCategories
          .map((cat) => `categories=${encodeURIComponent(cat)}`)
          .join("&");

        const response = await fetch(
          `${apiBaseUrl}/books?pageSize=${pageSize}&pageNum=${pageNum}${
            selectedCategories.length > 0 ? `&${categoryParams}` : ""
          }`
        );
        const data = await response.json();
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
        setApiError("");
      } catch {
        setApiError("Could not load books. Verify the backend API is running.");
      }
    };

    fetchBooks();
  }, [pageSize, pageNum, selectedCategories]);

  useEffect(() => {
    setPageNum(1);
  }, [selectedCategories]);

  const sortedBooks = useMemo(
    () =>
      [...books].sort((a, b) =>
        sortAsc
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      ),
    [books, sortAsc]
  );

  const handleAddToCart = (book: Book) => {
    addToCart({
      bookId: book.bookId,
      title: book.title,
      price: book.price,
      quantity: 1,
    });
    setNotice(`Added "${book.title}" to cart.`);
  };

  return (
    <div>
      {notice && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {notice}
          <button
            type="button"
            className="btn-close"
            onClick={() => setNotice("")}
            aria-label="Close"
          />
        </div>
      )}

      {apiError && (
        <div className="alert alert-danger" role="alert">
          {apiError}
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => setSortAsc((prev) => !prev)}
        >
          Sort by Title ({sortAsc ? "Z-A" : "A-Z"})
        </button>
        <select
          className="form-select w-auto"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
        </select>
      </div>

      {sortedBooks.map((b) => (
        <div className="card mb-3" key={b.bookId}>
          <div className="card-body">
            <h4 className="card-title">{b.title}</h4>
            <ul className="list-unstyled mb-3">
              <li>
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>Pages:</strong> {b.pageCount}
              </li>
              <li>
                <strong>Price:</strong> ${b.price.toFixed(2)}
              </li>
            </ul>
            <button className="btn btn-success" onClick={() => handleAddToCart(b)}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      <nav aria-label="Book list pages">
        <ul className="pagination flex-wrap">
          <li className={`page-item ${pageNum === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPageNum((p) => p - 1)}>
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li key={i + 1} className={`page-item ${pageNum === i + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setPageNum(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${pageNum === totalPages || totalPages === 0 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPageNum((p) => p + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default BookList;
