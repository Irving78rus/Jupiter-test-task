import React, { useState  } from "react";
import "./list.css";
import CardItem from "../../cardItem/CardItem";
import { filterOptions } from "../../../helpers/filterOptions";
import CategorySelector from "../categorySelector/CategorySelector";
import {cardsLimit} from '../../../helpers/config'
const Main = ({ items }) => {
  
  const [skip, setSkip] = useState(0);
  const [cardsList, setСardsList] = useState(items.slice(skip, skip+cardsLimit));

  // Высчитываем какую часть массива нам вырезать, чтобы добавить в рендер
  const loadMore = () => {
    if (skip < items.length) {
      setSkip((prev) => prev + cardsLimit);
      setСardsList((prev) => [...prev, ...items.slice(skip, skip+cardsLimit)]);
  }
  };
  // Добавляем новый кусок данных в рендер
  

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
        <CategorySelector
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
