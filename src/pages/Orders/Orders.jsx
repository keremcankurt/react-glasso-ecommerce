import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import styles from './Orders.module.scss'
import { getOrders } from '../../features/user/userService'
import Order from './Order'
export default function Orders() {
    const { user , isError, isSuccess } = useSelector((state) => state.user)
    const navigate = useNavigate()
    useEffect(() => {
      if(isError){
        navigate("/")
      }
    }, [user, isError, navigate])
    
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchData = async() => {
            setIsLoading(true)
            try {
                const response = await getOrders()
                const result = await response.json()
                if(!response.ok){
                    throw new Error(result.message)
                }
                setOrders(result)
            } catch (error) {
                
            }finally{
                setIsLoading(false)
            }
        }
        fetchData()
    }, [isSuccess])

    if(!isSuccess || isLoading) return <LoadingSpinner/>

    if(!orders || orders?.length <= 0){
        return (
            <div className={styles.emptyOrderList}>
                <div className={styles.emptyOrderContent}>
                    <div className={styles['icon']}>🛒</div>
                    <h2>Sipariş geçmişiniz bulunmamaktadır</h2>
                    <p>Henüz bir sipariş vermediniz. Favori ürünlerinizi keşfedin ve hemen alışverişe başlayın!</p>
                    <button 
                        className={styles.shopNowButton} 
                        onClick={() => navigate('/')}>
                        Alışverişe Başla
                    </button>
                </div>
            </div>
        )
    }
    
  return (
    <div className={styles.ordersContainer}>
        <h2>Geçmiş Siparişleriniz</h2>
        <div className={styles.head}>
            <span>Görsel</span>
            <span>Durum</span>
            <span>Tarih</span>
            <span>Fiyat</span>
        </div>
        <div className={styles.orders}>
            {
                orders.map(order => <Order key={order._id} order={order}/>)
            }
        </div>
    </div>
  )
}
