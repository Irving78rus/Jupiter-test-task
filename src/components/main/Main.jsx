import React, { useState, useEffect } from "react";
import "./main.css";
import CardItem from "./../cardItem/CardItem";
import { filterOptions } from "../../helpers/filterOptions";
import NavigationCategory from "./NavigationCategory/NavigationCategory";
// config numbersCards Приходит откуда-то из вне
const cardsLimit = 9;
const Main = ({ items }) => {
  const [cardsList, setСardsList] = useState([]);
  const [skip, setSkip] = useState(0);
  

  // Высчитываем какую часть массива нам вырезать, чтобы добавить в рендер
  const loadMore = () => {
    if (skip < items.length) {
      setSkip((prev) => prev + cardsLimit);
       
  }
  };
  // Добавляем новый кусок данных в рендер
  useEffect(() => {
    setСardsList((prev) => [...prev, ...items.slice(skip, skip+cardsLimit)]);
  }, [skip,items]);

  const [selectItem, setSelectItem] = useState([]);
  const [category, setCategory] = useState(filterOptions.SHOW_ALL);
  const nav = Object.values(filterOptions);
  const handleSelectCategory = (event) => {
    setCategory(event.target.value);
  };

  //Функция выбора карточек
  const selectCard = (id) => {
    if (selectItem.includes(id)) {
      setSelectItem(selectItem.filter((item) => item !== id));
    } else {
      setSelectItem((prev) => [...prev, id]);
    }
  };

  //Функция удаление выбранных карточек
  const deleteCard = () => {
    setСardsList(
      cardsList.filter((item) => !selectItem.includes(item.id))
    );
    setSelectItem([]);
  };

  // Удаление карточек по клавише delete
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
          setCategory(item);
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
        <NavigationCategory
          category={category}
          nav={nav}
          setCategory={setCategory}
          handleSelect={handleSelectCategory}
        />
        <div
          className="main__container"
          tabIndex="0"
          onKeyUp={(e) => handlerPressDelete(e)}
        >
          {category === filterOptions.SHOW_ALL
            ? cardsList.map((item) => renderCardItem(item))
            : cardsList
                .filter((item) => item.category === category)
                .map((item) => renderCardItem(item))}
        </div>
      </div>
      <button className="load-more" onClick={loadMore}>
        Load More
      </button>
    </main>
  );
};

export default Main;
