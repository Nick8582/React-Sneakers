import React, {useEffect, useState} from 'react';
import Card from "../components/Card";
import axios from "axios";
import Info from "../components/Info";

function Orders() {
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
      {
        orders.length > 0 ?
          (<>
              <div className="d-flex justify-between align-center mb-40">
                <h1>Мои заказы</h1>

              </div>
              <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                  <Card
                    {...item}
                    key={index}
                    loading={isLoading}
                  />
                ))}
              </div>
            </>
          ) : (
            <Info title="У вас нет заказов" description="Вы нищеброд?   Оформите хотя бы один заказ." image="/img/buy-no.png" btn={true} />
          )
      }

    </div>
  );
}

export default Orders;
