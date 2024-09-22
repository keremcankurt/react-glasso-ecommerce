import React, { useState } from 'react'
import styles from './Favorites.module.scss'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Product from '../../components/Product/Product'
export default function Favorites() {
    const [searchInput, setSearchInput] = useState("")
    
    const { products, isLoading } = useSelector((state) => state.product)
    const { user, isLoading: userLoading } = useSelector((state) => state.user)

    const filteredProducts = user?.favProducts ? 
        products?.filter(p => 
            user.favProducts.includes(p._id) 
            && p.name.toLowerCase().includes(searchInput.toLowerCase())) 
        : []
    if(isLoading || userLoading)
        return <LoadingSpinner/>
  return (
    <div className={styles.favoriteContainer}>
      <header>
        <h2>Favori Ürünleriniz</h2>
        <input 
            type='text'
            placeholder='Favorilerimde ara'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
        />
      </header>
        <main>
            {
                filteredProducts.map(product => <Product key={product._id} product={product}/>)
            }
        </main>
    </div>
  )
}
