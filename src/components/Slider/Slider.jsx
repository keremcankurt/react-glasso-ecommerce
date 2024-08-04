import React, { useRef } from 'react'
import styles from './Slider.module.scss'
import Product from '../Product/Product';
import SkeletonCard from '../SkeletonCard/SkeletonCard';

export default function Slider({products, text}) {
    const containerRef = useRef(null);

  const handleScrollLeft = () => {
    const container = containerRef.current;
    container.scrollBy({
      left: -200, 
      behavior: 'smooth',
    });
  };

  const handleScrollRight = () => {
    const container = containerRef.current;
    container.scrollBy({
      left: 200, 
      behavior: 'smooth',
    });
  }
  return (
    <div className={styles['slider-comp']}>
        <h3 className={styles["recommended-title"]}>{text}</h3>
        <div className={styles["recommended"]} ref={containerRef}>
          <div className={styles["recommended-products"]} ref={containerRef}>
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
        <div className={styles["scroll-buttons"]}>
          <button className={`${styles["scroll-button"]} ${styles["left"]}`} onClick={handleScrollLeft}>&lt;</button>
          <button className={`${styles["scroll-button"]} ${styles["right"]}`} onClick={handleScrollRight}>&gt;</button>
        </div>
      </div>
  )
}
