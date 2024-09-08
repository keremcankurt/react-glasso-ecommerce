import Slider from '../../components/Slider/Slider'
import { products } from '../../utils/product'
import styles from './HomePage.module.scss'
import React, { useEffect, useState } from 'react'
import SkeletonCarousel from '../../components/SkeletonCarousel/SkeletonCarousel';
import { getBanners } from '../../features/admin/adminService';
export default function HomePage() {

  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      try {
        setIsLoading(true)
        const response = await getBanners()
        const result = await response.json()
        if(!response.ok){
          throw new Error(result.message)
        }
        setImages(result)
      } catch (error) {
        console.log(error.message)
      }
      finally{
        setIsLoading(false)
      }
      
    } 
    fetchData()
  }, []);
  return (
    <div className={styles.container}>
      
      <SkeletonCarousel isLoading={isLoading} images={images}/>
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
