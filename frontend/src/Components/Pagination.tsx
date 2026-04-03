interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

const defaultPageSizes = [5, 10, 20];

function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = defaultPageSizes,
}: PaginationProps) {
  return (
    <div className="d-flex flex-wrap align-items-center gap-3 mt-3">
      <label className="d-flex align-items-center gap-2 mb-0">
        <span className="text-nowrap">Per page</span>
        <select
          className="form-select form-select-sm w-auto"
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            onPageChange(1);
          }}
        >
          {pageSizeOptions.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

      <nav aria-label="Pagination">
        <ul className="pagination flex-wrap mb-0">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {totalPages > 0 &&
            [...Array(totalPages)].map((_, i) => (
              <li
                key={i + 1}
                className={`page-item ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={() => onPageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          <li
            className={`page-item ${
              currentPage === totalPages || totalPages === 0 ? "disabled" : ""
            }`}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
