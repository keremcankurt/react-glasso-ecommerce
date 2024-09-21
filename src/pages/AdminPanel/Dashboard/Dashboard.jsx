import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.scss';
import SummaryCard from '../../../components/SummaryCard/SummaryCard';
import { CiShoppingCart, CiClock2, CiMoneyCheck1, CiMoneyBill } from "react-icons/ci";
import DoughnutChart from '../../../components/DoughnutChart/DoughnutChart';
import LineChart from '../../../components/LineChart/LineChart';
import OrdersTable from '../../../components/OrdersTable/OrdersTable';
import { deliverOrder, getDashboardDatas, shipOrder } from '../../../features/admin/adminService';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';

export default function Dashboard() {
  
  const [dashboardDatas, setDashboardDatas] = useState({
    orders: [],
    userCount: 0,
    preparingOrdersCount: 0,
    deliveriedOrdersCount: 0,
    totalRevenue: 0,
  })

  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async() => {
    setIsLoading(true)
    try {
      const response = await getDashboardDatas()
      const result = await response.json()
      if(!response.ok){
        throw new Error(result.message)
      }
      setDashboardDatas(result)
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleShipOrder = async(data) => {
    setIsLoading(true)
    try {
      const response = await shipOrder(JSON.stringify(data))
      const result = await response.json()
      if(!response.ok){
        throw new Error(result.message)
      }
      toast.success(result.message)
      fetchData()
    } catch (error) {
      toast.error(error.message)
    }
  }
  const handleDeliverOrder = async(id) => {
    setIsLoading(true)
    try {
      const response = await deliverOrder(id)
      const result = await response.json()
      if(!response.ok){
        throw new Error(result.message)
      }
      toast.success(result.message)
      fetchData()
    } catch (error) {
      toast.error(error.message)
    }
  }

  if(isLoading)
    return <LoadingSpinner/>

  return (
    <div className={styles.dashboard}>
      <div className={styles.summaryCards}>
        <SummaryCard icon={CiMoneyBill} title={"Kazanç"} value={dashboardDatas.totalRevenue} />
        <SummaryCard icon={CiShoppingCart} title={"Toplam Sipariş"} value={dashboardDatas.orders.length} />
        <SummaryCard icon={CiClock2} title={"Bekleyen Sipariş"} value={dashboardDatas.preparingOrdersCount} />
        <SummaryCard icon={CiMoneyCheck1} title={"Tamamlanan Sipariş"} value={dashboardDatas.deliveriedOrdersCount} />
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.charts}>
            <DoughnutChart orders={dashboardDatas.orders} />
            <LineChart orders={dashboardDatas.orders} />
        </div>
        <div className={styles.ordersTable}>
            <OrdersTable 
              orders={dashboardDatas.orders}
              handleDeliverOrder={handleDeliverOrder}
              handleShipOrder={handleShipOrder}
            />
        </div>
        </div>

    </div>
  );
}
