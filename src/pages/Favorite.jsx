import Card from "../components/Card";

function Favorite({items, onAddToFavorite}) {
  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>Мои закладки</h1>

      </div>
      <div className="d-flex flex-wrap">
        {items.map((item) => (
            <Card
              {...item}
              key={item.id}
              favorited={true}
              onFavorite={(obj) => onAddToFavorite(obj)}
            />
          ))}
      </div>
    </div>
  )
}

export default Favorite
