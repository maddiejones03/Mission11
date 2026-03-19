    import { useEffect, useState } from "react";
    import type { Book } from "./types/Book";

    function BookList() {
    // Creates state variables for books, pagination, and sorting
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sortAsc, setSortAsc] = useState(true);

    // Fetch data from backend
    useEffect(() => {
        const fetchBooks = async () => {
        const res = await fetch(
            `http://localhost:4000/books?pageSize=${pageSize}&pageNum=${pageNum}`
        );
        const data = await res.json();

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
        };

        fetchBooks();
    }, [pageSize, pageNum]);

    // Sorts the books before displaying them
    const sortedBooks = [...books].sort((a, b) => {
        if (sortAsc) {
        return a.title.localeCompare(b.title);
        } else {
        return b.title.localeCompare(a.title);
        }
    });

    return (
        <div className="container">
        <h1>Book List</h1>

        {/* Sort Button */}
        <button onClick={() => setSortAsc(!sortAsc)}>
            Sort by Title ({sortAsc ? "Z-A" : "A-Z"})
        </button>

        {/* Book display */}
        {sortedBooks.map((b) => (
            <div className="card" key={b.bookId}>
            <h3 className="card-title">{b.title}</h3>

            <div className="card-body">
                <ul className="list-unstyled">
                <li><strong>Author:</strong> {b.author}</li>
                <li><strong>Publisher:</strong> {b.publisher}</li>
                <li><strong>ISBN:</strong> {b.isbn}</li>
                <li><strong>Category:</strong> {b.classification}</li>
                <li><strong>Pages:</strong> {b.pageCount}</li>
                <li><strong>Price:</strong> ${b.price}</li>
                </ul>
            </div>
            </div>
        ))}

        {/*Pagination buttons */}
        <button
            disabled={pageNum === 1}
            onClick={() => setPageNum(pageNum - 1)}
        >
            Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
            <button
            key={i + 1}
            onClick={() => setPageNum(i + 1)}
            disabled={pageNum === i + 1}
            >
            {i + 1}
            </button>
        ))}

        <button
            disabled={pageNum === totalPages}
            onClick={() => setPageNum(pageNum + 1)}
        >
            Next
        </button>

        <br />

        {/* Page size dropdown */}
        <label>
            Results per page:
            <select
            value={pageSize}
            onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPageNum(1);
            }}
            >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            </select>
        </label>
        </div>
    );
    }

    export default BookList;