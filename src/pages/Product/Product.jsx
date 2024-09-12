import { calculateRemainingTime, formatPrice } from '../../utils/product';
import Slider from '../../components/Slider/Slider';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styles from './Product.module.scss'
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { addCart, favProduct } from '../../features/user/userSlice';

export default function Product() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [sortOption, setSortOption] = useState("newest");

    const { products, recommendedProducts, isLoading } = useSelector(state => state.product);

    const handleSortChange = (event) => {
      setSortOption(event.target.value);
    };

    useEffect(() => {
      setProduct(products.find((product) => product._id === id));
    }, [id, products]);

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

    const {user, cart} = useSelector(
      (state) => state.user
    );

    const dispatch = useDispatch();
    const [isFavorited, setIsFavorited] = useState(false);
    const handleAddToCart = () => {
      const selectedProduct = {
        ...product,
        quantity
      }
      dispatch(addCart(selectedProduct));
    };
    const handleFavorite = () => {
      setIsFavorited((prevValue) => !prevValue);
      dispatch(favProduct(id));
    };
    useEffect(() => {
      if (user?.favProducts && product) {
        const isProductFavorited = user.favProducts.some((id) => id === product._id);
        setIsFavorited(isProductFavorited);
      }
    }, [user, product]);

    if (isLoading) {
      return (
        <div className={styles.loading}>
          <LoadingSpinner />
        </div>
      );
    }

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
          <img className={styles["product-image"]} src={product.images[0]}  alt="Product" />
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
                    {formatPrice(((
                      product.price -
                      product.price * (product.campaign.discountPercentage / 100)
                    ).toFixed(2)))}{' '}
                    TL
                  </p>
                </>
              ) : (
                <p className={styles.price}>{formatPrice(product.price)} TL</p>
              )}
            </div>
              <div className={styles.actions}>
                <button className={`${styles['add-to-favorites']} ${isFavorited ? styles['favorited'] : ''}`} onClick={handleFavorite}>
                    <FaHeart />
                  </button>
                {product.stock === 0 ? <span className='invalid'>Ürün stokda yok...</span>:
                <>
                  {
                    !cart.some(item => item._id === product._id) &&
                    <select className={styles["quantity-select"]} value={quantity} onChange={handleQuantityChange}>
                      {[...Array(product.stock < 5 ? product.stock : 5)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  }
                  <button
                  className={cart.some(item => item._id === product._id) ? styles["added"]: styles["add-to-cart"]}
                  onClick={handleAddToCart}
                  disabled={cart.some(item => item._id === product._id)}
                >
                  {cart.some(item => item._id === product._id) ? "Sepete Eklendi" : "Sepete Ekle"}
                </button>

                </>
                }
              </div>
              
          </div>
          </div>
        </div>
        <Slider products={products?.filter(p => recommendedProducts?.includes(p?._id))} text="Önerilen Ürünler"/>
        {
          product.comments.length !== 0 &&
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
        }
        </>
      }
      </div>
    );
}
