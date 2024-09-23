import React, { useState } from 'react';
import styles from './Search.module.scss';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Product from '../../components/Product/Product';

export default function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q');

  const { products, isLoading } = useSelector(state => state.product);

  // State for filters
  const [sortType, setSortType] = useState('newest');
  const [showCampaignProducts, setShowCampaignProducts] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false); // New state for in-stock products

  if (isLoading) return <LoadingSpinner />;

  // Filtered and sorted products
  const filteredProducts = products
    .filter(product => (showCampaignProducts ? (new Date(product?.campaign?.endDate) > new Date()) : true))
    .filter(product => (inStockOnly ? product.stock > 0 : true)) 
    .filter(product => (query ? product.name.toLowerCase().includes(query.toLowerCase()) : true)) 
    .sort((a, b) => {
      switch (sortType) {
        case 'minPrice':
          return a.price - b.price;
        case 'maxPrice':
          return b.price - a.price;
        case 'mostFavorite':
          return b.favs.length - a.favs.length;
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  return (
    <div className={styles.searchPageContainer}>
      <div className={styles.sideBar}>
        <h2>Filtrele</h2>
        <div className={styles.sortType}>
          <label htmlFor="sortType">Sıralama:</label>
          <select
            name="sortType"
            id="sortType"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="minPrice">En düşük fiyat</option>
            <option value="maxPrice">En yüksek fiyat</option>
            <option value="mostFavorite">En favoriler</option>
            <option value="newest">En yeniler</option>
          </select>
        </div>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            id="campaignProducts"
            name="campaignProducts"
            checked={showCampaignProducts}
            onChange={() => setShowCampaignProducts(!showCampaignProducts)}
          />
          <label htmlFor="campaignProducts">Kampanyalı Ürünler</label>
        </div>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            id="inStockOnly"
            name="inStockOnly"
            checked={inStockOnly}
            onChange={() => setInStockOnly(!inStockOnly)}
          />
          <label htmlFor="inStockOnly">Sadece Stokta Olanlar</label>
        </div>
      </div>
      <div className={styles.products}>

        {
            filteredProducts && filteredProducts.length > 0 ?
            filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
            ))
            :
            <span className={styles.noResultsMessage}>
            Aramanıza uygun sonuç bulunamadı.
            </span>
        }
      </div>
    </div>
  );
}
