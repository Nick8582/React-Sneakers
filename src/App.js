import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";

function App() {
  const [items, setItems] = React.useState([])
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

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClose={() => setCartOpened(false)}/>}
      <Header onClickCart={() => setCartOpened(true)}/>
      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search"/>
            <input type="text" placeholder="Поиск..."/>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {
            items.map((obj, index) => (
              <Card
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
                onFavorite={() => console.log('Добавили в закладки')}
                onPlus={() => console.log('Нажали на плюс')}
                key={index}
              />
            ))
          }
        </div>
      </div>
    </div>);
}

export default App;
