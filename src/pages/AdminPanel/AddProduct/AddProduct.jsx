import React, { useState, useRef } from 'react';
import styles from './AddProduct.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createNewProduct } from '../../../features/admin/adminSlice';

export default function AddProduct() {

  const { isLoading } = useSelector((state) => state.admin)
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    price: '',
    stock: '',
    images: []
  });
  const fileInputRef = useRef(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5 - product.images.length);
    const imagePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: [...prevProduct.images, ...images]
      }));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    });
  };

  const removeImage = (index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((_, i) => i !== index)
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const resultAction = await dispatch(createNewProduct(product));
  
    if (createNewProduct.fulfilled.match(resultAction)) {
      setProduct({
        name: '',
        brand: '',
        price: '',
        stock: '',
        images: []
      }); 
    }
  };

  return (
    <div className={styles.container}>
      <h1>Ürün Ekle</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Ürün İsmi:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            disabled={isLoading} // Burada inputu disabled yapıyoruz
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="brand">Marka:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.multiFormGroup}>
          <div className={styles.formGroup}>
            <label htmlFor="price">Fiyat:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              disabled={isLoading}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="stock">Stok Miktarı:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
              min="0"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Resimler (1-5):</label>
          <div className={styles.imagePreview}>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            ref={fileInputRef}
            hidden
            disabled={isLoading}
          />
          <label htmlFor="images" className={styles.customFileInput}>
            Resim Seç
          </label>
            {product.images.map((image, index) => (
              <div key={index} className={styles.imageContainer}>
                <img src={image} alt={`Ürün resmi ${index + 1}`} />
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removeImage(index)}
                  disabled={isLoading}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className={`${styles.submitButton} ${isLoading ? 'loading' : ''}`}
          disabled={product.images.length < 1
            || !product.name
            || !product.brand
            || !product.stock
            || !product.price
            || isLoading
          }
        >
          Ekle
        </button>
      </form>

    </div>
  );
}
