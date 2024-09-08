import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal'; // Modal için bir kütüphane kullanıyoruz (react-modal gibi)
import styles from './ProductDetail.module.scss';

Modal.setAppElement('#root'); // Modal root ayarı

export default function ProductDetail({ product, 
  setSelectedProduct, 
  handleDeleteProductById,
  handleUpdateProductById
 }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      brand: product.brand,
      images: product.images,
    })
  }, [product])

  const handleCloseModal = () => {
    setSelectedProduct(null)
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5 - formData.images.length); // En fazla 5 resim
    const imagePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setFormData((prevProduct) => ({
        ...prevProduct,
        images: [...prevProduct.images, ...images]
      }));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    });
  };

  const handleSubmit = () => {
    handleUpdateProductById(formData)
    handleCloseModal();
  };

  const handleDelete = () => {
    handleDeleteProductById()
    handleCloseModal();
  };

  const fileInputRef = useRef(null);
  const removeImage = (index) => {
    setFormData((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((_, i) => i !== index)
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <Modal
        isOpen={product ? true : false}
        onRequestClose={handleCloseModal}
        contentLabel="Ürün Detayları"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>{product.name} - Detaylar</h2>
        <div className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Ürün İsmi:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
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
            value={formData.brand}
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
              value={formData.price}
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
              value={formData.stock}
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
            {formData?.images?.map((image, index) => (
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
      </div>
        <p>Yorumlar: {product.comments.length}</p>
        <p>Favoriler: {product.favs.length}</p>
        <div className={styles.starsWrapper}>
          <p className={styles["stars"]}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={styles["star"]}>
                <span
                  style={
                    product?.star >= star
                      ? { width: '100%' }
                      : { width: (product.star - star + 1) * 100 + '%' }
                  }
                  className={styles["star-o"]}
                ></span>
              </span>
            ))}
            ({product.comments.length})
          </p>
        </div>
        <div className={styles.buttons}>
            <button
            onClick={handleSubmit}
            className={styles.updateButton}
            disabled={formData?.images?.length < 1
                || !formData.name
                ||!formData.brand
                || !formData.stock 
                || !formData.price}
            >
            Güncelle
            </button>
            <button className={styles.deleteButton} onClick={handleDelete}>Sil</button>
            <button onClick={handleCloseModal}>Kapat</button>
        </div>
      </Modal>
    </div>
  );
}
