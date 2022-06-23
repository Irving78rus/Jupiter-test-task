import React, { useState } from "react";
import "./list.css";
import CardItem from "../../cardItem/CardItem";
import { filterOptions, cardsLimit } from '../../../helpers/constant'
import CategorySelector from "../categorySelector/CategorySelector";
let skip = 0;
const List = ({ items }) => {
  const [cardsList, setСardsList] = useState(
    items.slice(skip, skip + cardsLimit)
  );

  const loadMore = () => {
    if (skip < items.length) {
      skip += cardsLimit;
      setСardsList((prev) => [
        ...prev,
        ...items.slice(skip, skip + cardsLimit),
      ]);
    }
  };

  const [selectItem, setSelectItem] = useState([]);
  const [activeCategory, setActiveCategory] = useState(filterOptions.SHOW_ALL);
  const categories = Object.values(filterOptions);
  const handleSelectCategory = (category) => {
    setActiveCategory(category);
  };

  const selectCard = (id) => {
    if (selectItem.includes(id)) {
      setSelectItem(selectItem.filter((item) => item !== id));
    } else {
      setSelectItem((prev) => [...prev, id]);
    }
  };

  const deleteCard = () => {
    setСardsList(cardsList.filter((item) => !selectItem.includes(item.id)));
    setSelectItem([]);
  };

  const handlerPressDelete = (e) => {
    e.stopPropagation();
    if (e.key === "Delete") {
      deleteCard();
    }
  };

  const renderCardItem = (item) => {
    return (
      <CardItem
        key={item.id}
        filterCategory={(item) => {
          setActiveCategory(item);
        }}
        photo={item.src}
        category={item.category}
        name={item.name}
        onClick={() => {
          selectCard(item.id);
        }}
        active={false}
      />
    );
  };
  return (
    <main className="main">
      <div className="main__wrapper">
        <CategorySelector
          activeCategory={activeCategory}
          categories={categories}
          filterOptions={filterOptions}
          handleSelectCategory={handleSelectCategory}
        />
        <div
          className="main__container"
          tabIndex="0"
          onKeyUp={(e) => handlerPressDelete(e)}
        >

          {cardsList.map((item) => {
            if (activeCategory === filterOptions.SHOW_ALL || item.category === activeCategory)
              return renderCardItem(item);
              
            return null;
          })}
        </div>
      </div>
      <button className="load-more" onClick={loadMore}>
        Load More
      </button>
    </main>
  );
};

export default List;
