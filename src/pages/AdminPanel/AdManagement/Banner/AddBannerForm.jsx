import React, { useState } from 'react';
import styles from './AddBannerForm.module.scss';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addBanner } from '../../../../features/admin/adminSlice';

export default function AddBannerForm() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const { isLoading } = useSelector((state) => state.admin)
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

  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      toast.error("Lütfen tüm alanları doldurunuz");
      return;
    }
    const resultAction = await dispatch(addBanner({title, imageUrl: image}));
  
    if (addBanner.fulfilled.match(resultAction)) {
      setTitle('')
      setImage('')
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
            <button type='submit' className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Yükleniyor...' : 'Ekle'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
