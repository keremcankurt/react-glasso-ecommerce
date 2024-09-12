import React, { useEffect } from 'react';
import styles from './Order.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { decreaseQuantityOrder, deleteOrder, getCart, increaseQuantityOrder } from '../../features/user/userSlice';
import { getProducts } from '../../features/product/productSlice';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const OrderPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    (cart && cart.length > 0) && dispatch(getCart(cart))
    dispatch(getProducts())
  }, [dispatch]);

  const { isLoading} = useSelector(
    (state) => state.product
  );
  const { cart, user } = useSelector(
    (state) => state.user
  );

  const decreaseQuantity = (productId) => {
    dispatch(decreaseQuantityOrder(productId));
  };

  const increaseQuantity = (productId) => {
    dispatch(increaseQuantityOrder(productId));
  };

  const deleteProduct = (productId) => {
    dispatch(deleteOrder(productId));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      if (item.campaign) {
        const discountedPrice =
          item.price - item.price * (item.campaign.discountPercentage / 100);
        return total + discountedPrice * item.quantity;
      } else {
        return total + item.price * item.quantity;
      }
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      // const orders = { orders: JSON.parse(localStorage.getItem('cart')) };
      // dispatch(addOrder(orders));
    } else {
      toast.error("Sipariş vermek için giriş yapmalısınız.");
    }
  };

  if (isLoading) {
    return (
        <LoadingSpinner />
    );
  }

  return (
    <div className={styles["order-page"]}>
      {cart && cart.length > 0 ? (
        <>
          <div className={styles["products-section"]}>
            {cart.map((item) => (
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
            ))}
          </div>
          <form onSubmit={handleSubmit} className={styles["order-summary-section"]}>
            <div className={styles["total"]}>
              <span className={styles["total-text"]}>Toplam:</span>
              <span className={styles["total-price"]}>{calculateTotalPrice().toFixed(2)}{' '}TL</span>
            </div>
            <button type="submit" className={styles["confirm-order-button"]}>Siparişi Onayla</button>
          </form>
        </>
      ) : (
        <div className={styles["empty-cart"]}>
          <div className={styles["icon"]}>🛒</div>
          <h3>Sepetiniz Boş</h3>
          <p>Şimdi alışverişe başlayın ve favori ürünlerinizi sepetinize ekleyin!</p>
          <Link to="/" className={styles["go-to-shop-button"]}>Alışverişe Başla</Link>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
