import { useEffect, useState } from "react";
import "./CategoryFilter.css";

const apiBaseUrl = "http://localhost:4000";

interface CategoryFilterProps {
  selectedCategories: string[];
  onCheckboxChange: (next: string[]) => void;
}

function CategoryFilter({
  selectedCategories,
  onCheckboxChange,
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/books/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCheckboxChange = (targetValue: string) => {
    if (selectedCategories.includes(targetValue)) {
      onCheckboxChange(selectedCategories.filter((x) => x !== targetValue));
    } else {
      onCheckboxChange([...selectedCategories, targetValue]);
    }
  };

  return (
    <div className="category-filter card p-3 mb-3">
      <h5 className="mb-2">Filter by Category</h5>
      <div className="category-list">
        {categories.map((c) => (
          <div className="category-item" key={c}>
            <input
              id={c}
              type="checkbox"
              value={c}
              className="category-checkbox form-check-input mt-0"
              checked={selectedCategories.includes(c)}
              onChange={() => handleCheckboxChange(c)}
            />
            <label htmlFor={c} className="form-check-label">
              {c}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
