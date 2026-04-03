import { useEffect, useState } from "react";
import { fetchCategories } from "../api/booksApi";
import "./CategoryFilter.css";

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
    const load = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    load();
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
