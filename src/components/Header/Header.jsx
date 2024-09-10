import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { GiSunglasses } from 'react-icons/gi';
import { useSelector } from 'react-redux';

export default function Header() {
  const [promotionText, setPromotionText] = useState('');
  const { promotionalMessages } = useSelector((state) => state.product)

  useEffect(() => {
    if (promotionalMessages.length === 0) return;

    const interval = setInterval(() => {
      setPromotionText(prevText => {
        const currentIndex = promotionalMessages.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % promotionalMessages.length;
        return promotionalMessages[nextIndex];
      });
    }, 3000); 

    return () => clearInterval(interval); 
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
