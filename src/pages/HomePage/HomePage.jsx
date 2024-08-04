import { Carousel } from 'react-responsive-carousel';
import Slider from '../../components/Slider/Slider'
import { products } from '../../utils/product'
import styles from './HomePage.module.scss'
import React, { useEffect, useState } from 'react'
import SkeletonCarousel from '../../components/SkeletonCarousel/SkeletonCarousel';
export default function HomePage() {

  const images = [
    "https://stn-atasun.mncdn.com/Content/img/Unisite/firsatbuyuk.png?v=r7n1d150",
    "https://stn-atasun.mncdn.com/Content/img/Unisite/anabanner-min.png?v=r7n1d150",
    "https://stn-atasun.mncdn.com/Content/img/Unisite/brknrbbn.jpg?v=r7n1d150",
    "https://stn-atasun.mncdn.com/Content/img/Unisite/rbbannerweb.jpg?v=r7n1d150",
  ]
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verilerinizi veya görüntülerinizi yüklemek için bir API çağrısı yapabilirsiniz.
    // Bu örnekte, setTimeout ile yükleme sürecini simüle ediyoruz.
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 saniye sonra isLoading false olacak
  }, []);
  return (
    <div className={styles.container}>
      {/* <Carousel showThumbs={false} autoPlay={true}  interval={3000} infiniteLoop={true} showStatus={false} className={styles.slider}>
        {
          images.map((imageURL) => (
            <img src={imageURL} alt='carouselIMG' className={styles.carouselImg}/>

          ))
        }
      </Carousel> */}
      <SkeletonCarousel isLoading={false} images={images}/>
      <Slider products={products} text="İndirimli Ürünler"/>
      <Slider products={products} text="Tavsiye Edilenler"/>
      <Slider products={products} text="Trend Ürünler"/>
      {/* <div className={styles.products}>
        {products.map((product) => (
          <Product product={product}/>
        ))}
      </div> */}
    </div>
  )
}
