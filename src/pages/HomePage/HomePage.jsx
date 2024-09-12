import Slider from '../../components/Slider/Slider'
import styles from './HomePage.module.scss'
import React from 'react'
import SkeletonCarousel from '../../components/SkeletonCarousel/SkeletonCarousel';
import { useSelector } from 'react-redux';
export default function HomePage() {

  const { recommendedProducts, products, banners, isLoading } = useSelector((state) => state.product)


  return (
    <div className={styles.container}>
      
      <SkeletonCarousel isLoading={isLoading} images={banners}/>
      <Slider products={products?.filter(p => new Date(p.campaign?.endDate) > new Date())} text="İndirimli Ürünler"/>
      <Slider products={products?.filter(p => recommendedProducts?.includes(p?._id))} text="Tavsiye Edilen Ürünler"/>
      <Slider products={[]} text=""/>
    </div>
  )
}
