import React  from "react";
import "./CategorySelector.css";
const CategorySelector = ({ category, nav, setCategory, handleSelect }) => {
  return (
    <nav className="nav">
      <div className="nav__select">
        {nav.map(item => (
          <div
            key={item}
            className={category === item ? "nav-active" : null}
            onClick={() => {
              setCategory(item);
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <select
        className="nav__select-mobile"
        value={category}
        onChange={handleSelect}
      >
        <option value="Show All">Show All</option>
        <option value="Design">Design</option>
        <option value="Branding">Branding</option>
        <option value="Illustration">Illustration</option>
        <option value="Motion">Motion</option>
      </select>
    </nav>
  );
};

export default CategorySelector;
