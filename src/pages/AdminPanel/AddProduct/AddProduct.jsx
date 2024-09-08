import React, { useState, useRef } from 'react';
import styles from './AddProduct.module.scss';
import { toast } from 'react-toastify';
import { addProduct } from '../../../features/admin/adminService';

export default function AddProduct() {

  const [product, setProduct] = useState({
    name: '',
    brand: '',
    price: '',
    stock: '',
    images: []
  });
  const fileInputRef = useRef(null); // File input referansı

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5 - product.images.length); // En fazla 5 resim
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

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await addProduct(JSON.stringify(product))
      const result = await response.json()
      console.log(result)
      if(!response.ok){
        throw new Error(result.message)
      }
      setProduct({
        name: '',
        brand: '',
        price: '',
        stock: '',
        images: []
      })
      toast.success(result.message)
    } catch (error) {
      toast.error(error.message);
    }
  }

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
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={product.images.length < 1
            || !product.name
            ||!product.brand
            || !product.stock 
            || !product.price}
        >
          Ekle
        </button>
      </form>
    </div>
  );
}
