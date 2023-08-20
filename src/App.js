import React from "react";
import {Route, Routes} from "react-router-dom"
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from './pages/Home';
import Favorite from "./pages/Favorite";

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    axios.get(`https://k0utn3o9bl.mockify.ru/api/items`).then(res => {
      setItems(res.data.data)
    })
    axios.get(`https://k0utn3o9bl.mockify.ru/api/cart`).then(res => {
      setCartItems(res.data.data)
    })
    axios.get(`https://k0utn3o9bl.mockify.ru/api/favorites`).then(res => {
      setFavorites(res.data.data)
    })
  }, [])

  const onAddToCart = (obj) => {
    axios.post(`https://k0utn3o9bl.mockify.ru/api/cart`, obj)
    setCartItems(prev => [...prev, obj])
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://k0utn3o9bl.mockify.ru/api/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://k0utn3o9bl.mockify.ru/api/favorites/${obj.id}`)
      } else {
        const resp = await axios.post(`https://k0utn3o9bl.mockify.ru/api/favorites`, obj)
        setFavorites(prev => [...prev, resp.config.data])
      }
    } catch (error) {
      alert('Не удалось добавить в избранное')
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onRemove={onRemoveItem} onClose={() => setCartOpened(false)}/>}
      <Header onClickCart={() => setCartOpened(true)}/>
      <Routes>
        <Route path="/" exact element={<Home
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          onRemoveItem={onRemoveItem}
        />}/>
        <Route path="/favorite" exact element={<Favorite
          items={favorites}
          onAddToFavorite={onAddToFavorite}
        />}/>
      </Routes>
    </div>);
}

export default App;
