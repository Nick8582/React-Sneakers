import React from "react";

import Card from "../components/Card";
import AppContext from "../context";
import Info from "../components/Info";

function Favorite({onAddToCart}) {
  const {favorites, onAddToFavorite} = React.useContext(AppContext);
  return (
    <div className="content p-40">
      {favorites.length > 0 ?
        <>
          <div className="d-flex justify-between align-center mb-40">
            <h1>Мои закладки</h1>
          </div>
          <div className="d-flex flex-wrap">
            {favorites.map((item, index) => (
              <Card
                {...item}
                key={index}
                favorited={true}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}
          </div>
        </> : <Info title="Закладок нет :(" description="Вы ничего не добавляли в закладки" image="/img/favorite-no.png" btn={true}  />
      }
    </div>
  )
}

export default Favorite
