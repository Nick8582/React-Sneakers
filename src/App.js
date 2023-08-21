import React from "react";
import {Route, Routes} from "react-router-dom"
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from './pages/Home';
import Favorite from "./pages/Favorite";

import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get(`https://k0utn3o9bl.mockify.ru/api/cart`)
      const favoritesResponse = await axios.get(`https://k0utn3o9bl.mockify.ru/api/favorites`)
      const itemsResponse = await axios.get(`https://k0utn3o9bl.mockify.ru/api/items`)

      setCartItems(cartResponse.data.data)
      setFavorites(favoritesResponse.data.data)
      setItems(itemsResponse.data.data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://k0utn3o9bl.mockify.ru/api/cart/${obj.id}`)
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
    } else {
      axios.post(`https://k0utn3o9bl.mockify.ru/api/cart`, obj)
      setCartItems(prev => [...prev, obj])
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://k0utn3o9bl.mockify.ru/api/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://k0utn3o9bl.mockify.ru/api/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
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

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened}}>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer items={cartItems} onRemove={onRemoveItem} onClose={() => setCartOpened(false)}/>
        )}
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
          <Route path="/favorite" exact element={<Favorite/>}/>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
