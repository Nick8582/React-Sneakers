import styles from './Card.module.scss'
import React from "react";

function Index({imageUrl, title, price, onFavorite, id, onPlus, favorited=false, added = false }) {
  const [isAdded, setIsAdded] = React.useState(added)
  const [isFavorite, setIsFavorite] = React.useState(favorited)

  const onClickPlus = () => {
    setIsAdded(!isAdded)
    onPlus({imageUrl, title, price, id})
  }

  const onClickLiked = () => {
    setIsFavorite(!isFavorite)
    onFavorite({imageUrl, title, price, id})
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickLiked}>
        <img
          src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg' }
          alt="Unliked"
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt="Plus"
        />
      </div>
    </div>
  )
}

export default Index
