import React from 'react'
import styles from './Order.module.scss'
import { Link } from 'react-router-dom'
import { decreaseQuantityOrder, deleteOrder, increaseQuantityOrder } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
export default function Products({ cart, setCurrentPhase }) {
    const dispatch = useDispatch()

    const decreaseQuantity = (productId) => {
        dispatch(decreaseQuantityOrder(productId));
    };

    const increaseQuantity = (productId) => {
        dispatch(increaseQuantityOrder(productId));
    };

    const deleteProduct = (productId) => {
        dispatch(deleteOrder(productId));
    };



    return (
        <div className={styles["products-section"]}>
            {
                cart.map(item => (
                    <div className={styles["order-product"]} key={item._id}>
                        <Link className={styles['go-to-product']} to={`/product?id=${item._id}`}>Ürün sayfasına git</Link>
                        <div className={styles["product-image"]}>
                            <img className={styles["product-image"]} src={item?.images[0]} alt="Product" />
                        </div>
                        <div className={styles["product-details"]}>
                            <div className={styles["product-name"]}>{item.name}</div>
                            <div className={styles["product-price"]}>
                                {new Date(item?.campaign?.endDate) > new Date() ? (
                                    <>
                                        <span className={styles["old-price"]}>{item.price} TL</span>
                                        <span className={styles["new-price"]}>
                                            {(
                                                item.price -
                                                item.price * (item.campaign.discountPercentage / 100)
                                            ).toFixed(2)}{' '}
                                            TL
                                        </span>
                                    </>
                                ) : (
                                    <span className={styles["price"]}>{item.price} TL</span>
                                )}
                            </div>
                            <div className={styles["product-actions"]}>
                                <button onClick={() => decreaseQuantity(item._id)} disabled={item.quantity === 1}>-</button>
                                <span className={styles["quantity"]}>{item.quantity}</span>
                                <button onClick={() => increaseQuantity(item._id)} disabled={item.quantity === item.stock}>+</button>
                                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))
            }
           
        </div>
    )
}
