import React, { useState } from 'react';
import styles from './Orders.module.scss';
import { statusClassName } from '../../utils/utils';

export default function Order({ order }) {
  const [isOpen, setIsOpen] = useState(false);
  const maxVisibleImages = 3;
  const remainingProducts = order.products.length - maxVisibleImages;

  return (
    <div className={styles.orderContainer}>
      {/* Order Summary */}
        
      <div className={styles.orderSummary}>
        {/* Product Images */}
        <div className={styles.productImages}>
          {order.products.slice(0, maxVisibleImages).map((product, index) => (
            <div key={index} className={styles.imageWrapper}>
              <img src={product.image} alt={product.name} className={styles.productImage} />
            </div>
          ))}
          {remainingProducts > 0 && (
            <div className={styles.moreProducts}>+{remainingProducts}</div>
          )}
        </div>
          <span className={`${styles[statusClassName(order.status)]} ${styles.orderStatus}`}>{order.status}</span>
          <span className={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString()}</span>
          <span className={styles.orderPrice}>₺{order.price.toFixed(2)}</span>
          <button className={styles.toggleDetailsButton} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '▲' : '▼'}
          </button>
        </div>

      {/* Order Details */}
      {isOpen && (
        <div className={styles.orderDetails}>
          <h4>Sipariş Detayları</h4>
          {order.products.map((product, index) => (
            <div key={index} className={styles.productDetail}>
              <img src={product.image} alt={product.name} className={styles.detailImage} />
              <span>{product.name}</span>
              <span>₺{product.price.toFixed(2)}</span>
            </div>
          ))}
          {
            order.status === "Kargoya Verildi" &&
            <>
                <h4>Kargo Bilgileri</h4>
                <span>{order.cargo.shippingCompany}</span>
                <span className={styles.trackingNumber}>Takip Numarası: {order.cargo.trackingNumber}</span>
            </>
          }
        </div>
      )}
    </div>
  );
}
