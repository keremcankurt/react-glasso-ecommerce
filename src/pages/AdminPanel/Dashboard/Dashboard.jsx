import React from 'react';
import orders from '../../../utils/Orders.json';
import styles from './Dashboard.module.scss';
import SummaryCard from '../../../components/SummaryCard/SummaryCard';
import { CiShoppingCart, CiClock2, CiMoneyCheck1, CiMoneyBill } from "react-icons/ci";
import DoughnutChart from '../../../components/DoughnutChart/DoughnutChart';
import LineChart from '../../../components/LineChart/LineChart';
import OrdersTable from '../../../components/Orders-Table/OrdersTable';

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.summaryCards}>
        <SummaryCard icon={CiMoneyBill} title={"Kazanç"} value={20} />
        <SummaryCard icon={CiShoppingCart} title={"Toplam Sipariş"} value={120} />
        <SummaryCard icon={CiClock2} title={"Bekleyen Sipariş"} value={20} />
        <SummaryCard icon={CiMoneyCheck1} title={"Tamamlanan Sipariş"} value={115} />
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.charts}>
            <DoughnutChart orders={orders} />
            <LineChart orders={orders} />
        </div>
        <div className={styles.ordersTable}>
            <OrdersTable orders={orders} />
        </div>
        </div>

    </div>
  );
}
