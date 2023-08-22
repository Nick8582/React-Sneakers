import React from "react";
import {Route, Routes} from "react-router-dom"
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import Home from './pages/Home';
import Favorite from "./pages/Favorite";

import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get(`https://k0utn3o9bl.mockify.ru/api/cart`),
          axios.get(`https://k0utn3o9bl.mockify.ru/api/favorites`),
          axios.get(`https://k0utn3o9bl.mockify.ru/api/items`)
        ])
        setIsLoading(false)
        setCartItems(cartResponse.data.data)
        setFavorites(favoritesResponse.data.data)
        setItems(itemsResponse.data.data)
      } catch (error) {
        alert('Ошибка при запросе данных')
      }
    }

    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
        await axios.delete(`https://k0utn3o9bl.mockify.ru/api/cart/${obj.id}`)
      } else {
        setCartItems(prev => [...prev, obj])
        await axios.post(`https://k0utn3o9bl.mockify.ru/api/cart`, obj)
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину')
    }
  }

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(`https://k0utn3o9bl.mockify.ru/api/cart/${id}`)
      setCartItems(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      alert('Ошибка при удалении из корзины')
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://k0utn3o9bl.mockify.ru/api/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      } else {
        await axios.post(`https://k0utn3o9bl.mockify.ru/api/favorites`, obj)
        setFavorites(prev => [...prev, obj])
      }
    } catch (error) {
      alert('Не удалось добавить в избранное')
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  const isItemFavorite = (id) => {
    return favorites.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        isItemFavorite,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems
      }}>
      <div className="wrapper clear">
        <Drawer items={cartItems} onRemove={onRemoveItem} onClose={() => setCartOpened(false)} opened={cartOpened}/>
        <Header onClickCart={() => setCartOpened(true)}/>
        <Routes>
          <Route path="/" exact element={<Home
            items={items}
            cartItem={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />}/>
          <Route path="/favorite" exact element={<Favorite onAddToCart={onAddToCart}/>}/>
          <Route path="/orders" exact element={<Orders/>}/>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
