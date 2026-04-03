import type { Book } from "../types/Book";

export const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

export async function fetchBooks(
  pageSize: number,
  pageNum: number,
  categories: string[]
): Promise<FetchBooksResponse> {
  const categoryParams = categories
    .map((cat) => `categories=${encodeURIComponent(cat)}`)
    .join("&");

  const query =
    categories.length > 0
      ? `?pageSize=${pageSize}&pageNum=${pageNum}&${categoryParams}`
      : `?pageSize=${pageSize}&pageNum=${pageNum}`;

  const response = await fetch(`${API_URL}/books${query}`);

  if (!response.ok) {
    throw new Error(`Failed to load books (${response.status})`);
  }

  return response.json() as Promise<FetchBooksResponse>;
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${API_URL}/books/categories`);

  if (!response.ok) {
    throw new Error(`Failed to load categories (${response.status})`);
  }

  return response.json() as Promise<string[]>;
}

export async function addBook(
  book: Omit<Book, "bookId">
): Promise<Book> {
  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...book, bookId: 0 }),
  });

  if (!response.ok) {
    throw new Error(`Failed to add book (${response.status})`);
  }

  return response.json() as Promise<Book>;
}

export async function updateBook(book: Book): Promise<void> {
  const response = await fetch(`${API_URL}/books/${book.bookId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error(`Failed to update book (${response.status})`);
  }
}

export async function deleteBook(bookId: number): Promise<void> {
  const response = await fetch(`${API_URL}/books/${bookId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete book (${response.status})`);
  }
}
