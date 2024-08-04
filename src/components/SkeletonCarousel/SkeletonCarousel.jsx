import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './SkeletonCarousel.module.scss'; // CSS dosyanızın yolunu buraya yazın

const SkeletonCarousel = ({ isLoading, images }) => {
  return (
    <>
      {isLoading ? (
        <div className={styles['skeleton-carousel-img']}></div>
      ) : 
      
    <Carousel showThumbs={false} autoPlay={true} interval={3000} infiniteLoop={true} showStatus={false} className={styles.slider}>
        {images.map((imageURL, index) => (
          <img key={index} src={imageURL} alt="carouselIMG" className={styles.carouselImg} />
        ))}
    </Carousel>
      }
    </>
  );
};

export default SkeletonCarousel;
