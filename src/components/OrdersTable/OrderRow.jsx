// OrderRow.js
import React, { useState } from 'react';
import styles from './OrderRow.module.scss';
import { FaInfoCircle } from 'react-icons/fa';

const OrderRow = ({ order, handleShipOrder, handleDeliverOrder }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    shippingCompany: order.cargo.shippingCompany || '',
    trackingNumber: order.cargo.trackingNumber || '',
  });

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };
  const statusClassName = (status) => {
    switch (status) {
        case "Ödeme Beklemede":
            return "paymentPending"
        case "Ödeme Başarısız":
            return "paymentFailure"
        case "Sipariş Hazırlanıyor":
            return "preparing"
        case "Kargoya Verildi":
            return "shipping"
        case "Teslim Edildi":
            return "delivered"
    
        default:
            break;
    }
  }

  return (
    <>
      <tr className={styles.orderRow}>
        <td><span className={styles[statusClassName(order.status)]}>{order.status}</span></td>
        <td>{order.price}₺</td>
        <td>{new Date(order.createdAt).toLocaleDateString('tr-TR')}</td>
        <td>
          <button className={styles.detailsButton} onClick={toggleDetails}>
          <FaInfoCircle size={24} color="blue" />
          </button>
        </td>
      </tr>
      {showDetails && (
        <tr className={styles.detailsRow}>
          <td colSpan="5">
            <div className={styles.details}>
                <h4>Sipariş Id:  {order._id}</h4>
              <h4>Ürünler:</h4>
              <ul>
                {order.products.map(product => (
                  <li key={product._id} className={styles.product}>
                    <img src={product.image} alt={product.name} />
                    <span>{product.name}</span>
                    <span>{product.quantity || 1} adet</span>
                    <span>{product.price * product.quantity}₺</span>
                  </li>
                ))}
              </ul>
              <h4>Adres:</h4>
              <p>{order.address.name} {order.address.surname}</p>
              <p>{order.address.town}, {order.address.district}, {order.address.city}</p>
              <p>{order.address.addressDesc}</p>
              <p>Telefon: {order.address.phone}</p>
              {
                order.cargo.shippingCompany &&
                <>
                    <h4>Kargo Bilgileri:</h4>
                    <span>{order.cargo.shippingCompany}</span>
                    <span className={styles.trackingNumber}>Takip Numarası: {order.cargo.trackingNumber}</span>
                </>
              }

              {order.status === 'Sipariş Hazırlanıyor' && (
                <div className={styles.cargoInfo}>
                  <h4>Kargo Bilgileri</h4>
                  <input
                    type="text"
                    name="shippingCompany"
                    value={shippingInfo.shippingCompany}
                    onChange={handleChange}
                    placeholder="Kargo Şirketi"
                  />
                  <input
                    type="text"
                    name="trackingNumber"
                    value={shippingInfo.trackingNumber}
                    onChange={handleChange}
                    placeholder="Takip Numarası"
                  />
                  <button 
                    className={styles.shipButton} 
                    onClick={() => handleShipOrder({
                      orderId: order._id,
                      ...shippingInfo
                    })} 
                    disabled={!shippingInfo.shippingCompany || !shippingInfo.trackingNumber}>
                    Kargoya Ver
                  </button>
                </div>
              )}
              {
                order.status === "Kargoya Verildi" &&
                <div>
                    <button className={styles.deliveredButton} onClick={() => handleDeliverOrder(order._id)}>Teslim Et</button>
                </div>
              }
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default OrderRow;
