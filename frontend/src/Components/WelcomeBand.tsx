import { Link } from "react-router-dom";

function WelcomeBand() {
  return (
    <div className="row mb-3">
      <div className="col-12">
        <div className="bg-primary text-white p-3 rounded">
          <div className="d-flex flex-wrap align-items-center gap-3">
            <h2 className="mb-0">Bookstore Catalog</h2>
            <Link
              to="/adminbooks"
              className="btn btn-sm btn-light text-nowrap"
            >
              Admin books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBand;
