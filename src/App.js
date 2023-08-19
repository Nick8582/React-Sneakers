import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import axios from "axios";

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    axios.get('https://k0utn3o9bl.mockify.ru/api/items').then(res => {
      setItems(res.data.data)
    })
    axios.get('https://k0utn3o9bl.mockify.ru/api/cart').then(res => {
      setCartItems(res.data.data)
    })
  }, [])

  const onAddToCart = (obj) => {
    axios.post('https://k0utn3o9bl.mockify.ru/api/cart', obj)
    setCartItems(prev => [...prev, obj])
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://k0utn3o9bl.mockify.ru/api/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onRemove={onRemoveItem} onClose={() => setCartOpened(false)}/>}
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
                index={index}
                onFavorite={() => console.log('Добавили в закладки')}
                onPlus={(obj) => onAddToCart(obj)}
                onRemove={() => onRemoveItem(index)}
                key={index}
              />
            ))}
        </div>
      </div>
    </div>);
}

export default App;
