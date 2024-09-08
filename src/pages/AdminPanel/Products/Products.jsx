import React, { useEffect, useState } from 'react';
import styles from './Products.module.scss';
import { FaInfoCircle } from "react-icons/fa";
import { getProducts } from '../../../features/product/productService';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners'; 
import ProductDetail from './ProductDetail';
import { deleteProduct, updateProduct } from '../../../features/admin/adminService';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false); 
    const [loading, setLoading] = useState(true);

    const [selectedProduct, setSelectedProduct] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getProducts();
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message);
                }
                setProducts(result);
                setFilteredProducts(result);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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
        setLoading(true);
        try {
            const response = await deleteProduct(selectedProduct._id);
            const result = await response.json();
            if(!response.ok){
                throw new Error(result.message)
            }
            const updatedProducts = products.filter(p => p._id !== selectedProduct._id)
            setProducts(updatedProducts)
            toast.success(result.message)
        } catch (error) {
            toast.error(error.message)
        }
        finally{
            setLoading(false);
        }
    }

    const handleUpdateProductById = async(data) => {
        try {
            setLoading(true);
            const response = await updateProduct(selectedProduct._id, JSON.stringify(data))
            const result = await response.json()
            if(!response.ok){
                throw new Error(result.message)
            }
            const updatedProducts = products.map(p => 
                p._id === selectedProduct._id ? result.updatedProduct : p)
            setProducts(updatedProducts)
            toast.success(result.message)
        } catch (error) {
            toast.error(error.message)
        }
        finally{
            setLoading(false);
        }
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

            {loading ? (
                <div className={styles.loading}>
                    <ClipLoader size={50} color="#007bff" /> {/* ClipLoader kullanıldı */}
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
