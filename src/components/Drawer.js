function Drawer({onClose, onRemove, items = []}) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30 ">
          Корзина
          <img className="removeBtn cu-p" src="/img/btn-remove.svg" onClick={onClose} alt="Close"/>
        </h2>

        {
          items.length > 0 ? (
            <>
              <div className="items">
                {
                  items.map((obj, index) => (
                    <div className="cartItem d-flex align-center mb-20" key={index}>
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
                    <b>21 498 руб. </b>
                  </li>
                  <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>1074 руб. </b>
                  </li>
                </ul>
                <button className="greenButton">
                  Оформить заказ
                  <img src="/img/arrow.svg" alt="Arrow"/>
                </button>
              </div>
            </>
          ) : (
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
              <img src="/img/empty-cart.png" className='mb-20' width={120} height={120} alt=""/>
              <h2>Корзина пуста</h2>
              <p className='opacity-6'>Добавьте хотя бы одну пару кроссовок чтобы сделать заказ.</p>
              <button className='greenButton' onClick={onClose}>
                <img src="/img/arrow.svg" alt="Arrow"/>
                Вернуться назад
              </button>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default Drawer
