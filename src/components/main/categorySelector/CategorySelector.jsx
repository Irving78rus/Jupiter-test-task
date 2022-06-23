import React from "react";
import "./CategorySelector.css";
const CategorySelector = ({ activeCategory, categories, handleSelectCategory }) => {
  return (
    <section className="filter">
      <div className="filter__select">
        {categories.map(item => (
          <div
            key={item}
            className={activeCategory === item 
              ? "filter__category filter_active " 
              : "filter__category"}
            onClick={() => { handleSelectCategory(item) }}
          >
            {item}
          </div>
        ))}
      </div>
      <select
        className="filter__select-mobile"
        value={activeCategory}
        onChange={(event) => { handleSelectCategory(event.target.value) }}
      >
        {categories.map(item => <option value={item} key={item}>{item}</option>)}

      </select>
    </section>
  );
};

export default CategorySelector;
