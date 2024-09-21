import React, { useEffect, useState } from 'react';
import styles from './Products.module.scss';
import { FaInfoCircle } from "react-icons/fa";
import ProductDetail from './ProductDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../features/product/productSlice';
import { removeProduct, updateProduct } from '../../../features/admin/adminSlice';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

export default function Products() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const { products, recommendedProducts, isLoading } = useSelector(
        (state) => state.product
    );
    const { isLoading: adminLoading } = useSelector(
        (state) => state.admin
    );
    const [selectedProduct, setSelectedProduct] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    // Filtreleme ve arama
    useEffect(() => {
        let filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        // Stok durumuna ve tavsiye durumuna göre filtreleme
        switch (filterType) {
            case 'inStock':
                filtered = filtered.filter(product => product.stock > 0);
                break;
            case 'outOfStock':
                filtered = filtered.filter(product => product.stock === 0);
                break;
            case 'recommended':
                filtered = filtered.filter(product => recommendedProducts.includes(product._id));
                break;
            case 'notRecommended':
                filtered = filtered.filter(product => !recommendedProducts.includes(product._id));
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    }, [searchQuery, filterType, products, recommendedProducts]);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    const handleFilterChange = (e) => setFilterType(e.target.value);

    const handleDeleteProductById = async() => {
        dispatch(removeProduct(selectedProduct._id));
    };

    const handleUpdateProductById = async(data) => {
        dispatch(updateProduct({
            _id: selectedProduct._id,
            updatedProduct: data
        }));
    };

    if(isLoading || adminLoading)
        return(
            <LoadingSpinner/>
        )
    return (
        <div className={styles.container}>
            <div className={styles.filterSection}>
                <input
                    type="text"
                    placeholder="Ürün ara..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={styles.searchBox}
                />
                <div className={styles.filterOptions}>
                    <select value={filterType} onChange={handleFilterChange} className={styles.dropdown}>
                        <option value="all">Tüm Ürünler</option>
                        <option value="inStock">Sadece Stokta Olanlar</option>
                        <option value="outOfStock">Stokta Olmayanlar</option>
                        <option value="recommended">Tavsiye Edilenler</option>
                        <option value="notRecommended">Tavsiye Edilmeyenler</option>
                    </select>
                </div>
            </div>
                <div className={`${styles.products} ${styles.fadeIn}`}>
                    <table>
                        <thead>
                            <tr>
                                <th className={styles.img}>Görsel</th>
                                <th className={styles.name}>İsim</th>
                                <th className={styles.recommended}>Tavsiye Edilen</th>
                                <th className={styles.details}>Detaylar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts && filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <tr 
                                        key={product._id} 
                                        className={`${styles.fadeIn} ${product.stock === 0 ? styles.outOfStock : ''}`}
                                    >
                                        <td><img src={product.images[0]} alt={product._id} /></td>
                                        <td>{product.name}</td>
                                        <td>
                                            {recommendedProducts.includes(product._id) ? (
                                                <span>✔</span>
                                            ) : (
                                                <span>❌</span>
                                            )}
                                        </td>
                                        <td>
                                            <button onClick={() => setSelectedProduct(product)}>
                                                <FaInfoCircle size={24} color="blue" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">Ürün bulunamadı.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {selectedProduct && (
                        <ProductDetail 
                            product={selectedProduct} 
                            setSelectedProduct={setSelectedProduct}
                            handleDeleteProductById={handleDeleteProductById}
                            handleUpdateProductById={handleUpdateProductById}
                        />
                    )}
                </div>
        </div>
    );
}
