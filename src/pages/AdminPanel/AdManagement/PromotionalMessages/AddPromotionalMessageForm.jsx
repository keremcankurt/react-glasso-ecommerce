import React, { useState } from 'react';
import styles from './PromotionalMessages.module.scss';
import { toast } from 'react-toastify';
import { addPromotionalMessage } from '../../../../features/admin/adminService';

export default function AddPromotionalMessageForm({ setPromotionalMessages }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false); // Yeni yükleniyor durumu

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      toast.error("Lütfen mesaj alanını doldurunuz");
      return;
    }

    setLoading(true); // Form gönderilme işlemi başladığında yükleniyor durumunu true yap
    try {
      const response = await addPromotionalMessage(JSON.stringify({ title }));
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      setPromotionalMessages(result.messages);
      setTitle('');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // İşlem tamamlandığında yükleniyor durumunu false yap
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
            <button type='submit' disabled={loading}>
              {loading ? 'Yükleniyor...' : 'Ekle'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
