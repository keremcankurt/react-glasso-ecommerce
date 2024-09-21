import React from 'react';
import OrderRow from './OrderRow';
import styles from './OrdersTable.module.scss';

const OrdersTable = ({ orders, handleDeliverOrder, handleShipOrder }) => {
  return (
    <div className={styles.ordersTable}>
      <h3>Siparişler</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Durum</th>
            <th>Ücret</th>
            <th>İşlem Tarihi</th>
            <th>Detaylar</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow key={order.id} order={order}
            handleDeliverOrder={handleDeliverOrder}
            handleShipOrder={handleShipOrder}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
