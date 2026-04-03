import { useState } from "react";
import type { Book } from "../types/Book";
import { addBook } from "../api/booksApi";
import "./BookForm.css";

const emptyFields: Omit<Book, "bookId"> = {
  title: "",
  author: "",
  publisher: "",
  isbn: "",
  classification: "",
  category: "",
  pageCount: 0,
  price: 0,
};

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

function NewBookForm({ onSuccess, onCancel }: NewBookFormProps) {
  const [formData, setFormData] = useState<Omit<Book, "bookId">>(emptyFields);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const key = name as keyof Omit<Book, "bookId">;
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
      await addBook(formData);
      setFormData(emptyFields);
      onSuccess();
    } catch {
      setSubmitError("Could not add book. Try again.");
    }
  };

  return (
    <form className="book-form card p-3 mb-4" onSubmit={handleSubmit}>
      <h4 className="mb-3">Add book</h4>
      {submitError && (
        <div className="alert alert-danger py-2" role="alert">
          {submitError}
        </div>
      )}
      <div className="row g-2">
        <div className="col-md-6">
          <label className="form-label" htmlFor="new-title">
            Title
          </label>
          <input
            id="new-title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="new-author">
            Author
          </label>
          <input
            id="new-author"
            name="author"
            className="form-control"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="new-publisher">
            Publisher
          </label>
          <input
            id="new-publisher"
            name="publisher"
            className="form-control"
            value={formData.publisher}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="new-isbn">
            ISBN
          </label>
          <input
            id="new-isbn"
            name="isbn"
            className="form-control"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="new-classification">
            Classification
          </label>
          <input
            id="new-classification"
            name="classification"
            className="form-control"
            value={formData.classification}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="new-category">
            Category
          </label>
          <input
            id="new-category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="new-pageCount">
            Page count
          </label>
          <input
            id="new-pageCount"
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
          <label className="form-label" htmlFor="new-price">
            Price
          </label>
          <input
            id="new-price"
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
          Submit
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default NewBookForm;
