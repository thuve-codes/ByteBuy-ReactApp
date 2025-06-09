import React from "react";

const CategoryFilter = ({ categories, selected, onSelect }) => {
  return (
    <div className="filter">
      <label>Filter by Category:</label>
      <select value={selected} onChange={(e) => onSelect(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
