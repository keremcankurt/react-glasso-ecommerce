import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './CartDropDown.module.scss'
import { Link } from 'react-router-dom';
import { FaCartArrowDown } from 'react-icons/fa';
const CartDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const {cart} = useSelector(
    (state) => state.user
    );
  return (
    <div className={styles["cart-container"]}>
        <button className={styles["cart-toggle"]} onClick={toggleDropdown}>
            <FaCartArrowDown style={{width: "25px", height: "auto", color: "gray"}}/>
            <span className={styles["cart-badge"]}>{cart?.length || 0}</span>
        </button>
        {isOpen && (
            
            <div className={styles["cart-dropdown"]}>
            {cart?.length > 0 ? (
                <>
                <ul className={styles["cart-items"]}>
                {cart.slice(0, 3).map((item) => (
                    <li className={styles["cart-item"]} key={item._id}>
                    <img className={styles["product-image"]} src={item?.images[0]}  alt="Product" />
                    <div className={styles["item-details"]}>
                        <p className={styles["item-name"]}>{item.name}</p>
                        {new Date(item?.campaign?.endDate) > new Date() ?
                          <p className={styles["product-new-price"]}>
                            {(
                              item.price -
                              item.price * (item.campaign.discountPercentage / 100)
                            ).toFixed(2)}{' '}
                            TL
                          </p>
                         :<p className={styles["product-item-price"]}>{item.price} TL</p>
                         }
                        <p className={styles["item-quantity"]}>Adet: {item.quantity}</p>
                    </div>
                    </li>
                ))}
                {cart.length > 3 && (
                    <li className={styles["cart-item"]}>
                    <p className={styles["item-name"]}>+{cart.length - 3} daha</p>
                    </li>
                )}
                </ul>
                <Link className={styles['go-to-cart']} to='/order'>Sepete Git</Link>
                </>
            ) : (
                <p className={styles["empty-cart"]}>Sepet Boş</p>
            )}
            </div>
        )}
    </div>
  );
};

export default CartDropdown;
