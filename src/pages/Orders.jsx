import React, {useContext, useEffect, useState} from 'react';
import Card from "../components/Card";
import axios from "axios";
import AppContext from "../context";

function Orders() {
  const {onAddToFavorite, onAddToCart} = useContext(AppContext)
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get('https://k0utn3o9bl.mockify.ru/api/orders')
        setOrders(data.data.reduce((prev, obj) => [...prev, ...obj.item], []))
        setIsLoading(false)
      } catch (error) {
        alert('Не удалось загрузить заказы')
      }
    })()
  }, [])

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>Мои заказы</h1>

      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            {...item}
            key={index}
            onFavorite={(obj => onAddToFavorite(obj))}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
