import React, { useEffect, useState } from 'react';
import styles from './Products.module.scss';
import { FaInfoCircle } from "react-icons/fa";
import { ClipLoader } from 'react-spinners'; 
import ProductDetail from './ProductDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../features/product/productSlice';
import { removeProduct, updateProduct } from '../../../features/admin/adminSlice';

export default function Products() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false); 
    const {products, isLoading} = useSelector(
        (state) => state.product
      );

    const {isLoading: adminLoading} = useSelector(
        (state) => state.admin
      );

    const [selectedProduct, setSelectedProduct] = useState(null)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch]);

    // Filtreleme ve arama
    useEffect(() => {
        let filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (inStockOnly) {
            filtered = filtered.filter(product => product.stock > 0);
        }
        setFilteredProducts(filtered);
    }, [searchQuery, inStockOnly, products]);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const handleInStockChange = () => setInStockOnly(!inStockOnly);

    const handleDeleteProductById = async() => {
        dispatch(removeProduct(selectedProduct._id))
    }

    const handleUpdateProductById = async(data) => {
        dispatch(updateProduct({
            _id: selectedProduct._id,
            updatedProduct: data
        }))
    }
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
                <label>
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={handleInStockChange}
                    />
                    Sadece stokta olanlar
                </label>
            </div>

            {isLoading || adminLoading ? (
                <div className={styles.loading}>
                    <ClipLoader size={50} color="#007bff" />
                </div>
            ) : (
                <div className={`${styles.products} ${styles.fadeIn}`}>
                    <table>
                        <thead>
                            <tr>
                                <th className={styles.img}>Görsel</th>
                                <th className={styles.name}>İsim</th>
                                <th className={styles.details}>Detaylar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts && filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <tr key={product._id} className={`${styles.fadeIn} ${product.stock === 0 ? styles.outOfStock : ''}`}>
                                        <td><img src={product.images[0]} alt={product._id} /></td>
                                        <td>{product.name}</td>
                                        <td><button onClick={() => setSelectedProduct(product)}><FaInfoCircle size={24} color="blue" /></button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">Ürün bulunamadı.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {
                        selectedProduct &&
                        <ProductDetail product={selectedProduct} 
                        setSelectedProduct={setSelectedProduct}
                        handleDeleteProductById={handleDeleteProductById}
                        handleUpdateProductById={handleUpdateProductById}
                        />
                    }
                </div>
            )}
        </div>
    );
}
