import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './Product.module.scss';
import { formatPrice } from '../../utils/product';

const productCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Product({ product }) {
  const currentDate = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
  const campaignDate = new Date(product.campaign?.endDate) > currentDate
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
        <div className={styles["product-reviews"]}>
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
        </div>
        <span className={styles["brand"]}>{product.brand}</span>
        <div className={styles["product-infos"]}>
          <h2 className={styles["product-name"]}>{product.name}</h2>
          {campaignDate ? (
            <p className={styles["campaign-price"]}>
              <p className={styles["old-price"]}>{formatPrice(product.price)} TL</p>
              {formatPrice((product.price - (product.price * product.campaign.discountPercentage) / 100).toFixed(2))} TL
            </p>
          ) : (
            <p className={styles["price"]}>{formatPrice(product.price)} TL</p>
          )}
        </div>
        <div className={styles["buttons"]}>
          <div className={styles["actions"]}>
            <button className={styles[`add-to-favorites`]}>
              <FaHeart />
            </button>
            {product.stock !== 0 && (
              <>
                <button className={styles["add-to-cart"]}>
                  Sepete Ekle
                </button>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
