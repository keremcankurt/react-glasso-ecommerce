import React, { useState } from 'react';
import styles from './PromotionalMessages.module.scss';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addPromotionalMessage } from '../../../../features/admin/adminSlice';

export default function AddPromotionalMessageForm({ setPromotionalMessages }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const { isLoading } = useSelector((state) => state.admin)

  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      toast.error("Lütfen mesaj alanını doldurunuz");
      return;
    }
    const resultAction = await dispatch(addPromotionalMessage({ title }));
  
    if (addPromotionalMessage.fulfilled.match(resultAction)) {
      setTitle('')
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.addButton}
        onClick={() => setShowForm(!showForm)}
      >
        Yeni Reklam Ekle
      </button>
      <div className={`${styles.form} ${showForm ? styles.showForm : ''}`}>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <input
              placeholder='Mesaj'
              value={title}
              name='title'
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type='submit' disabled={isLoading}>
              {isLoading ? 'Yükleniyor...' : 'Ekle'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
