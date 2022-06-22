import React from "react";
import "./cardItem.css";
import { useState } from "react";
const CardItem = ({
  photo,
  category,
  name,
  active,
  onClick,
  filterCategory,
}) => {
  const [press, setPress] = useState(active);

  const click = () => {
    onClick();
    setPress(!press);
  };
  return (
    <div
      className={
        press ? "card card__wrapper card__active" : "card card__wrapper"
      }
      onClick={click}
    >
      <img src={photo} alt="anyPhoto" />
      <div
        className="card__category"
        onClick={() => {
          filterCategory(category);
        }}
      >
        {category}
      </div>
      <div className="card__name">{name}</div>
    </div>
  );
};

export default CardItem;
