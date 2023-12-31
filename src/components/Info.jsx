import React from 'react';
import AppContext from "../context";
import {Link} from "react-router-dom";

function Info({image, title, description, btn = false}) {
  const {setCartOpened} = React.useContext(AppContext)

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img src={image} className='mb-20' width={120} alt=""/>
      <h2>{title}</h2>
      <p className='opacity-6'>{description}</p>
      {
        btn ? (
          <Link className='greenButton' to='/'>
            <img src="/img/arrow.svg" alt="Arrow"/>
            Вернуться назад
          </Link>
        ) : (
          <button className='greenButton' onClick={() => setCartOpened(false)}>
            <img src="/img/arrow.svg" alt="Arrow"/>
            Вернуться назад
          </button>
        )
      }

    </div>
  );
}

export default Info;
