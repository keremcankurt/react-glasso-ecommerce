import React, { useState } from 'react';
import styles from './AddBannerForm.module.scss';
import { toast } from 'react-toastify';
import { addBanner } from '../../../../features/admin/adminService';

export default function AddBannerForm({ setBanners }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      toast.error("Lütfen tüm alanları doldurunuz");
      return;
    }

    setLoading(true);

    try {
      const response = await addBanner(JSON.stringify({ title, imageUrl: image }));
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      setBanners(result.banners);
      setTitle('');
      setImage(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.addButton}
        onClick={() => setShowForm(!showForm)}
      >
        Yeni Banner Ekle
      </button>
      <div className={`${styles.form} ${showForm ? styles.showForm : ''}`}>
        {showForm && (
          <form onSubmit={handleSubmit} className={styles.formContent}>
            <div className={styles.formGroup}>
              <label htmlFor='title'>Başlık</label>
              <input
                type='text'
                id='title'
                placeholder='Başlık'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='imageUpload' className={styles.imageUploadLabel}>
                {image ? <img src={image} alt='Preview' className={styles.imagePreview} /> : 'Resim Yükle'}
              </label>
              <input
                type='file'
                id='imageUpload'
                accept='image/*'
                onChange={handleImageChange}
                className={styles.imageUploadInput}
              />
            </div>
            <button type='submit' className={styles.submitButton} disabled={loading}>
              {loading ? 'Yükleniyor...' : 'Ekle'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
