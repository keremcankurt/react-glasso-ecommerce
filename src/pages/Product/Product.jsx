import { calculateRemainingTime, formatPrice, products } from '../../utils/product';
import Slider from '../../components/Slider/Slider';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styles from './Product.module.scss'
import { useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa';

export default function Product() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1);
    const [sortOption, setSortOption] = useState("newest");

    const {user: authUser} = useSelector(
      (state) => state.auth
    );
    const handleSortChange = (event) => {
      setSortOption(event.target.value);
    };
    useEffect(() => {
      setProduct(products.find((product) => product._id === id))
    }, [id])
    const handleQuantityChange = (event) => {
      setQuantity(parseInt(event.target.value));
    };
    const [remainingTime, setRemainingTime] = useState();

    useEffect(() => {
      if(new Date(product?.campaign?.endDate) > new Date())
      {
        const timer = setInterval(() => {
          const newRemainingTime = calculateRemainingTime(product?.campaign?.endDate);
          setRemainingTime(newRemainingTime);
    
          if (newRemainingTime === '0') {
            clearInterval(timer);
          }
        }, 1000);
    
        return () => {
          clearInterval(timer);
        };
      }
      
    }, [product?.campaign?.endDate]);
  
  return (
    <div className={styles.container}>
    {product &&
        <>
        {new Date(product.campaign?.endDate) > new Date() &&
        <div className={styles['campaign-info']}>
          <span className={styles.timer}>
            Kampanyanın bitmesine kalan süre: {remainingTime}
          </span>
        </div>
        }
      <div className={styles["product-info"]}>
        <img className={styles["product-image"]} src={product.img}  alt="Product" />
        <div className={styles["product-details"]}>
        <div className={[styles.left]}>
        <span className={styles["brand"]}>{product.brand}</span>
        <h2 className={styles["product-name"]}>
            {product.name}{' '}
            {new Date(product.campaign?.endDate) > new Date() && (
              <span className={styles.campaign}>{`${product.campaign.discountPercentage}% İndirim`}</span>
            )}
          </h2>
          <div className={styles["price-section"]}>
            {new Date(product.campaign?.endDate) > new Date() ? (
              <>
                <p className={styles["old-price"]}>{formatPrice(product.price)} TL</p>
                <p className={styles["discounted-price"]}>
                  {formatPrice((
                    product.price -
                    product.price * (product.campaign.discountPercentage / 100)
                  ).toFixed(2))}{' '}
                  TL
                </p>
              </>
            ) : (
              <p className={styles.price}>{formatPrice(product.price)} TL</p>
            )}
          </div>
            <div className={styles.actions}>
                <button className={styles[`add-to-favorites`]}>
                  <FaHeart />
                </button>
              {product.stock === 0 ? <span className='invalid'>Ürün stokda yok...</span>:
              <>
                <select className={styles["quantity-select"]} value={quantity} onChange={handleQuantityChange}>
                  {[...Array(product.stock < 5 ? product.stock : 5)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                <button
                  className={styles["add-to-cart"]}
                >
                  {"Sepete Ekle"}
                </button>

              </>
              }
            </div>
            
        </div>
        </div>
      </div>
      <Slider products={products} text="Önerilen Ürünler"/>
      <div className={styles.reviews}>
        <p className={styles.stars}>
            <span className={styles.star}>
            <span style={!product.star ? { width: "0%" } : 
            product.star >= 1 ? { width: "100%" } : {width: product.star*100+"%"}} 
            className={styles["star-o"]}></span></span>
            <span className={styles.star}>
            <span style={!product.star || product.star < 1 ? { width: "0%" } : 
            product.star >= 2  ? { width: "100%" } : 
            {width: (product.star-1)*100+"%"}}
            className={styles["star-o"]}></span></span>
            <span className={styles["star"]}>
            <span style={!product.star || product.star < 2 ? { width: "0%" } : 
            product.star >= 3 ? { width: "100%" } : {width: (product.star-2)*100+"%"}} 
            className={styles["star-o"]}></span></span>
            <span className={styles["star"]}>
            <span style={!product.star || product.star < 3 ? { width: "0%" } :
            product.star >= 4 ? { width: "100%" } : {width: (product.star-3)*100+"%"}} 
            className={styles["star-o"]}></span></span>
            <span className={styles["star"]}>
            <span style={!product.star || product.star < 4 ? { width: "0%" } : 
            product.star >= 5 ? { width: "100%" } : {width: (product.star-4)*100+"%"}} 
            className={styles["star-o"]}></span></span>
            ({product.comments.length})
          </p>
          {product.comments.length !== 0 && 
          <div className={styles["comment-sort"]}>
            <select id="sort" value={sortOption} onChange={handleSortChange}>
              <option value="newest">En Yeni</option>
              <option value="oldest">En Eski</option>
              <option value="highest">En Yüksek Puan</option>
              <option value="lowest">En Düşük Puan</option>
            </select>
          </div>
          }
      </div>
      </>
    }
    </div>
  );
}
