import Card from "../components/Card";
import React from "react";

function Home({items, searchValue, setSearchValue, onAddToCart, onAddToFavorite, onChangeSearchInput, onRemoveItem}) {
  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search"/>
          {searchValue &&
            <img
              onClick={() => setSearchValue('')}
              className="clear cu-p"
              src="/img/btn-remove.svg" alt="Clear"
            />}
          <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Поиск..."/>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {items
          .filter(item => item.title.toLowerCase()
            .includes(searchValue.toLowerCase()))
          .map((item) => (
            <Card
              {...item}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              onRemove={() => onRemoveItem(item.id)}
              key={item.id}
            />
          ))}
      </div>
    </div>
  )
}

export default Home
