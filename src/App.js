import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr = [
  {title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, imageUrl: '/img/sneakers/1.jpg'},
  {title: 'Мужские Кроссовки Nike Air Max 270', price: 12999, imageUrl: '/img/sneakers/2.jpg'},
  {title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 8499, imageUrl: '/img/sneakers/3.jpg'},
  {title: 'Кроссовки Puma X Aka Boku Future Rider', price: 8999, imageUrl: '/img/sneakers/4.jpg'},
]

function App() {
  return (
    <div className="wrapper clear">
      <Drawer/>
      <Header/>
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
            arr.map((obj, index) => (
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
