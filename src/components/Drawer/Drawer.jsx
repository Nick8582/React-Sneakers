import Info from "../Info";
import React, {useState} from "react";
import axios from "axios";
import {useCart} from "../../hooks/useCart";
import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({onClose, onRemove, items = [], opened}) {
  const { cartItems, setCartItems, totalPrice} = useCart()
  const [isOrderComplite, setIsOrderComplite] = useState(false);
  const [orderId, setOrderId] = React.useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const id = Math.random().toString(10).slice(10)
      await axios.post('https://k0utn3o9bl.mockify.ru/api/orders', {
        id: id,
        item: cartItems
      })
      setOrderId(id)
      setIsOrderComplite(true)
      setCartItems([])
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete('https://k0utn3o9bl.mockify.ru/api/cart/' + item.id)
        await delay(1000)
      }
    } catch (error) {
      alert('Не удалось отправить заказ')
    }
    setIsLoading(false)
  }

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30 ">
          Корзина
          <img className="removeBtn cu-p" src="/img/btn-remove.svg" onClick={onClose} alt="Close"/>
        </h2>

        {items.length > 0 ? (
          <>
            <div className="items">
              {
                items.map((obj) => (
                  <div className="cartItem d-flex align-center mb-20" key={obj.id}>
                    <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg"
                         alt="Remove"/>
                  </div>
                ))
              }
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round(totalPrice / 100 * 5)} руб. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ
                <img src="/img/arrow.svg" alt="Arrow"/>
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplite ? "Заказ оформлен!" : "Корзина пуста"}
            description={isOrderComplite ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок чтобы сделать заказ."}
            image={isOrderComplite ? "/img/complete-order.png" : "/img/empty-cart.png"}
          />
        )}

      </div>
    </div>
  )
}

export default Drawer
