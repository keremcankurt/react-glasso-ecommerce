import React from 'react'
import styles from './Order.module.scss'
import { Link } from 'react-router-dom'
export default function Empty() {
  return (
    <div className={styles['empty-cart']}>
        <div className={styles['icon']}>🛒</div>
        <h3>Sepetiniz Boş</h3>
        <p>Şimdi alışverişe başlayın ve favori ürünlerinizi sepetinize ekleyin!</p>
        <Link to="/" className={styles['go-to-shop-button']}>
        Alışverişe Başla
        </Link>
    </div>
  )
}
