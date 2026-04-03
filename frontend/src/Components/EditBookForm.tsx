import { useEffect, useState } from "react";
import type { Book } from "../types/Book";
import { updateBook } from "../api/booksApi";
import "./BookForm.css";

interface EditBookFormProps {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}

function EditBookForm({ book, onSuccess, onCancel }: EditBookFormProps) {
  const [formData, setFormData] = useState<Book>({ ...book });

  useEffect(() => {
    setFormData({ ...book });
  }, [book]);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const key = name as keyof Book;
    if (key === "bookId") return;
    if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [key]: value === "" ? 0 : Number(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    try {
      await updateBook(formData);
      onSuccess();
    } catch {
      setSubmitError("Could not update book. Try again.");
    }
  };

  return (
    <form className="book-form card p-3 mb-4" onSubmit={handleSubmit}>
      <h4 className="mb-3">Edit book (ID {formData.bookId})</h4>
      {submitError && (
        <div className="alert alert-danger py-2" role="alert">
          {submitError}
        </div>
      )}
      <div className="row g-2">
        <div className="col-md-6">
          <label className="form-label" htmlFor="edit-title">
            Title
          </label>
          <input
            id="edit-title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="edit-author">
            Author
          </label>
          <input
            id="edit-author"
            name="author"
            className="form-control"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="edit-publisher">
            Publisher
          </label>
          <input
            id="edit-publisher"
            name="publisher"
            className="form-control"
            value={formData.publisher}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="edit-isbn">
            ISBN
          </label>
          <input
            id="edit-isbn"
            name="isbn"
            className="form-control"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="edit-classification">
            Classification
          </label>
          <input
            id="edit-classification"
            name="classification"
            className="form-control"
            value={formData.classification}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="edit-category">
            Category
          </label>
          <input
            id="edit-category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="edit-pageCount">
            Page count
          </label>
          <input
            id="edit-pageCount"
            name="pageCount"
            type="number"
            min={0}
            className="form-control"
            value={formData.pageCount || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="edit-price">
            Price
          </label>
          <input
            id="edit-price"
            name="price"
            type="number"
            min={0}
            step="0.01"
            className="form-control"
            value={formData.price || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="mt-3 d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditBookForm;
