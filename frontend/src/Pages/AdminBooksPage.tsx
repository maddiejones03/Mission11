import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Book } from "../types/Book";
import { deleteBook, fetchBooks } from "../api/booksApi";
import NewBookForm from "../Components/NewBookForm";
import EditBookForm from "../Components/EditBookForm";
import Pagination from "../Components/Pagination";
import "./AdminBooksPage.css";

function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalNumBooks, setTotalNumBooks] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const totalPages = Math.ceil(totalNumBooks / pageSize) || 0;

  const loadBooks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchBooks(pageSize, pageNum, []);
      setBooks(data.books);
      setTotalNumBooks(data.totalNumBooks);
    } catch {
      setError("Could not load books. Verify the backend API is running.");
      setBooks([]);
      setTotalNumBooks(0);
    } finally {
      setLoading(false);
    }
  }, [pageSize, pageNum]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const handleDelete = async (bookId: number) => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }
    try {
      await deleteBook(bookId);
      setBooks((prev) => prev.filter((b) => b.bookId !== bookId));
      setTotalNumBooks((n) => Math.max(0, n - 1));
    } catch {
      setError("Failed to delete book.");
    }
  };

  return (
    <div className="container py-4 admin-books-page">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="mb-0">Admin — Books</h1>
        <div className="d-flex flex-wrap gap-2">
          <Link to="/" className="btn btn-outline-secondary">
            Home
          </Link>
          <Link to="/cart" className="btn btn-outline-secondary">
            Cart
          </Link>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setShowForm(true);
              setEditingBook(null);
            }}
          >
            Add book
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {showForm && (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false);
            loadBooks();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSuccess={() => {
            setEditingBook(null);
            loadBooks();
          }}
          onCancel={() => setEditingBook(null)}
        />
      )}

      {loading && (
        <div className="alert alert-secondary" role="status">
          Loading…
        </div>
      )}

      {!loading && (
        <div className="table-responsive admin-books-table-wrap">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>ISBN</th>
                <th>Classification</th>
                <th>Category</th>
                <th>Pages</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.bookId}>
                  <td>{b.bookId}</td>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.publisher}</td>
                  <td>{b.isbn}</td>
                  <td>{b.classification}</td>
                  <td>{b.category}</td>
                  <td>{b.pageCount}</td>
                  <td>${b.price.toFixed(2)}</td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => {
                          setEditingBook(b);
                          setShowForm(false);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(b.bookId)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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

export default AdminBooksPage;
