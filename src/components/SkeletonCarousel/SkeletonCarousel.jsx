import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './SkeletonCarousel.module.scss'; 

const SkeletonCarousel = ({ isLoading, images }) => {

  return (
    <>
      {isLoading ? (
        <div className={styles['skeleton-carousel-img']}></div>
      ) : 
      images && images.length > 0 &&
    <Carousel showThumbs={false} autoPlay={true} interval={3000} infiniteLoop={true} showStatus={false} className={styles.slider}>
        {images.map((image) => (
          <img key={image.id} src={image.imageUrl} alt="carouselIMG" className={styles.carouselImg} />
        ))}
    </Carousel>
      }
    </>
  );
};

export default SkeletonCarousel;
