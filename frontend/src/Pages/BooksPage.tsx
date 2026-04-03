import { useState } from "react";
import BookList from "../Components/BookList";
import CartSummary from "../Components/CartSummary";
import CategoryFilter from "../Components/CategoryFilter";
import WelcomeBand from "../Components/WelcomeBand";

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container py-4">
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
