import { useState } from "react";
import { Link } from "react-router-dom";
import BookList from "../Components/BookList";
import CartSummary from "../Components/CartSummary";
import CategoryFilter from "../Components/CategoryFilter";
import WelcomeBand from "../Components/WelcomeBand";

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-end mb-2">
        <Link to="/adminbooks" className="btn btn-sm btn-outline-secondary">
          Admin books
        </Link>
      </div>
      <WelcomeBand />
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            onCheckboxChange={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
      <CartSummary />
    </div>
  );
}

export default BooksPage;
