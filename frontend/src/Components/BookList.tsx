import { useEffect, useMemo, useState } from "react";
import type { Book } from "../types/Book";
import { useCart } from "../context/CartContext";
import { fetchBooks } from "../api/booksApi";
import Pagination from "./Pagination";

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
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    let cancelled = false;

    const loadBooks = async () => {
      setLoading(true);
      setApiError("");
      try {
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);
        if (!cancelled) {
          setBooks(data.books);
          setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
        }
      } catch {
        if (!cancelled) {
          setApiError(
            "Could not load books. Verify the backend API is running."
          );
          setBooks([]);
          setTotalPages(0);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadBooks();
    return () => {
      cancelled = true;
    };
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
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
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

      {loading && (
        <div className="alert alert-secondary" role="status">
          Loading books…
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => setSortAsc((prev) => !prev)}
        >
          Sort by Title ({sortAsc ? "Z-A" : "A-Z"})
        </button>
      </div>

      {!loading &&
        sortedBooks.map((b) => (
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
              <button
                className="btn btn-success"
                onClick={() => handleAddToCart(b)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}

export default BookList;
