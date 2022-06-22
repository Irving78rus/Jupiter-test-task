import React, { useState, useEffect } from "react";
import "./main.css";
import CardItem from "./../cardItem/CardItem";
// config numbersCards Приходит откуда-то из вне
const numbersCards = 9
const Main = ({ items }) => {
  const [listForRender, setListForRender] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(numbersCards);
 

  // Высчитываем какую часть массива нам вырезать, чтобы добавить в рендер
  const loadMore = () => {
    if (end < items.length) {
      setStart((prev) => prev + numbersCards);
      setEnd((prev) => prev + numbersCards);
    }
  };
  // Добавляем новый кусок данных в рендер
  useEffect(() => {
    setListForRender((prev) => [...prev, ...items.slice(start, end)]);
  }, [end]);
 

  const [category, setCategory] = useState("Show All");
  const [selectItem, setSelectItem] = useState([]);
  const nav = ["Show All", "Design", "Branding", "Illustration", "Motion"];
  const handleSelect = (event) => {
    setCategory(event.target.value);
  };

  //Функция выбора карточек
  const select = (id) => {
    if (selectItem.includes(id)) {
      setSelectItem(selectItem.filter((item) => item !== id));
    } else {
      setSelectItem((prev) => [...prev, id]);
    }
  };

  //Функция удаление выбранных карточек
  const deleteCard = () => {
    setListForRender(
      listForRender.filter((item) => !selectItem.includes(item.id))
    );
    setSelectItem([]);
  };

// Удаление карточек по клавише delete
  const handlerKey = (e) => {
    if (e.key === "Delete") {
      deleteCard();
    }
    e.stopPropagation();
  };

  return (
    <main className="main">
      <div className="main__wrapper">
        <div className="main__nav">
          <div className="main__select">
            {nav.map((item, index) => (
              <div
                key={index}
                className={category === item ? "main__nav_active" : null}
                onClick={() => {
                  setCategory(item);
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <select
            className="main__select-mobile"
            value={category}
            onChange={handleSelect}
          >
            <option value="Show All">Show All</option>
            <option value="Design">Design</option>
            <option value="Branding">Branding</option>
            <option value="Illustration">Illustration</option>
            <option value="Motion">Motion</option>
          </select>
        </div>
        <div
          className="main__container"
          tabIndex="0"
          onKeyUp={(e) => handlerKey(e)}
        >
          {category === "Show All"
            ? listForRender.map((item) => (
                <CardItem
                  key={item.id}
                  filterCategory={(item) => {
                    setCategory(item);
                  }}
                  photo={item.src}
                  category={item.category}
                  name={item.name}
                  onClick={() => {
                    select(item.id);
                  }}
                  active={false}
                />
              ))
            : listForRender
                .filter((item) => item.category === category)
                .map((item) => (
                  <CardItem
                    key={item.id}
                    filterCategory={(item) => {
                      setCategory(item);
                    }}
                    photo={item.src}
                    onClick={() => {
                      select(item.id);
                    }}
                    active={false}
                    category={item.category}
                    name={item.name}
                  />
                ))}
        </div>
      </div>
      <button className="load-more" onClick={loadMore}>
        Load More
      </button>
    </main>
  );
};

export default Main;
