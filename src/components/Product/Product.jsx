import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './Product.module.scss';
import { formatPrice } from '../../utils/product';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, decreaseQuantityOrder, favProduct, increaseQuantityOrder } from '../../features/user/userSlice';

const productCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Product({ product }) {
  const currentDate = new Date();
  const campaignDate = new Date(product.campaign?.endDate) > currentDate
  const [isFavorited, setIsFavorited] = useState(false);
  const { user, cart } = useSelector((state) => state.user)
  const productQuantity = cart.filter((item) => item._id === product._id)[0]?.quantity;
  useEffect(() => {
    if (user?.favProducts && product) {
      const isProductFavorited = user?.favProducts?.some((id) => id === product?._id);
      setIsFavorited(isProductFavorited);
    }
  }, [user, product]);

  const dispatch = useDispatch()
  const handleFavorite = (e) => {
    e.preventDefault();
    setIsFavorited((prevValue) => !prevValue);
    dispatch(favProduct(product._id));
  };
  const handleAddToCart = (e) => {
    e.preventDefault();
    const selectedProduct = {
      ...product,
      quantity: 1,
    };
    dispatch(addCart(selectedProduct));
  };
  const decreaseQuantity = (e, productId) => {
    e.preventDefault();
    dispatch(decreaseQuantityOrder(productId));
  };

  const increaseQuantity = (e, productId) => {
    e.preventDefault();
    dispatch(increaseQuantityOrder(productId));
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={productCardVariants}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/product?id=${product._id}`} className={`${styles["productComp"]} ${product.stock === 0 ? styles['soldOut'] : ''}`}>
        {campaignDate && <p className={styles["campaign"]}>%{product.campaign.discountPercentage}</p>}
        <div className={`${styles['product-img-container']} ${product.stock === 0 ? styles['sold-out'] : ''}`}>
          <img className={styles["productImg"]} src={`${product?.images[0]}`} alt="product" />
        </div>
        {/* <div className={styles["product-reviews"]}>
          <p className={styles["stars"]}>
            <span className={styles["star"]}>
              <span
                style={
                  !product.star ? { width: '0%' } : product.star >= 1 ? { width: '100%' } : { width: product.star * 100 + '%' }
                }
                className={styles["star-o"]}
              ></span>
            </span>
            <span className={styles["star"]}>
              <span
                style={
                  !product.star || product.star < 1 ? { width: '0%' } : product.star >= 2 ? { width: '100%' } : { width: (product.star - 1) * 100 + '%' }
                }
                className={styles["star-o"]}
              ></span>
            </span>
            <span className={styles["star"]}>
              <span
                style={
                  !product.star || product.star < 2 ? { width: '0%' } : product.star >= 3 ? { width: '100%' } : { width: (product.star - 2) * 100 + '%' }
                }
                className={styles["star-o"]}
              ></span>
            </span>
            <span className={styles["star"]}>
              <span
                style={
                  !product.star || product.star < 3 ? { width: '0%' } : product.star >= 4 ? { width: '100%' } : { width: (product.star - 3) * 100 + '%' }
                }
                className={styles["star-o"]}
              ></span>
            </span>
            <span className={styles["star"]}>
              <span
                style={
                  !product.star || product.star < 4 ? { width: '0%' } : product.star >= 5 ? { width: '100%' } : { width: (product.star - 4) * 100 + '%' }
                }
                className={styles["star-o"]}
              ></span>
            </span>
            ({product.comments.length})
          </p>
        </div> */}
        <span className={styles["brand"]}>{product.brand}</span>
        <div className={styles["product-infos"]}>
          <h2 className={styles["product-name"]}>{product.name}</h2>
          {campaignDate ? (
            <p className={styles["campaign-price"]}>
              <span className={styles["old-price"]}>{formatPrice(product.price)} TL</span>
              {formatPrice((product.price - (product.price * product.campaign.discountPercentage) / 100).toFixed(2))} TL
            </p>
          ) : (
            <p className={styles["price"]}>{formatPrice(product.price)} TL</p>
          )}
        </div>
        <div className={styles["buttons"]}>
          <div className={styles["actions"]}>
            {user && (
                <button className={`${styles['add-to-favorites']} ${isFavorited ? `${styles['favorited']}` : ''}`} onClick={handleFavorite}>
                  <FaHeart />
                </button>
              )}
            {product.stock !== 0 && (
                <>
                {cart.some((item) => item._id === product._id) ? (
                  <div className={styles["product-buttons"]}>
                    <button onClick={(e) => decreaseQuantity(e, product._id)} disabled={productQuantity === 1}>-</button>
                    <span className={styles["quantity"]}>{productQuantity}</span>
                    <button onClick={(e) => increaseQuantity(e, product._id)} disabled={productQuantity === product?.stock}>+</button>
                  </div>
                ) : (
                  <button className={styles["add-to-cart"]} onClick={handleAddToCart}>
                    Sepete Ekle
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
