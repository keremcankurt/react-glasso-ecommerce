import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { GiSunglasses } from 'react-icons/gi';
import { getPromotionalMessages } from '../../features/admin/adminService';

export default function Header() {
  const [promotionText, setPromotionText] = useState('');
  const [promotionalMessages, setPromotionalMessages] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await getPromotionalMessages();
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message);
        }
        setPromotionalMessages(result);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (promotionalMessages.length === 0) return;

    const interval = setInterval(() => {
      setPromotionText(prevText => {
        const currentIndex = promotionalMessages.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % promotionalMessages.length;
        return promotionalMessages[nextIndex];
      });
    }, 3000); // 3 saniyede bir değişir

    return () => clearInterval(interval); // Temizlik
  }, [promotionalMessages]);
  return (
    <nav className={styles.container}>
      {
        promotionText !== "" &&
        <span className={styles.campaign}>{promotionText.title}</span>
      }
      <div className={styles.mainNav}>
        <Link className={styles.logo} to="/">
          DSK-TİCARET <GiSunglasses size={50} className={styles.glasses} />
        </Link>
        <div className={styles.headerRight}>
          <p>
            <Link to='/login'>Giriş Yap</Link>&nbsp;|&nbsp;
            <Link to='/register'>Kayıt Ol</Link>
          </p>
        </div>
      </div>
    </nav>
  );
}
