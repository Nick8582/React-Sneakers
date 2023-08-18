import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    fetch('https://k0utn3o9bl.mockify.ru/api/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json.data)
      })
  }, [])

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj])
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)}/>}
      <Header onClickCart={() => setCartOpened(true)}/>
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
            .map((item, index) => (
              <Card
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={() => console.log('Добавили в закладки')}
                onPlus={(obj) => onAddToCart(obj)}
                key={index}
              />
            ))}
        </div>
      </div>
    </div>);
}

export default App;
