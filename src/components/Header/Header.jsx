import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { GiSunglasses } from 'react-icons/gi';

export default function Header() {
  const [campaignText, setCampaignText] = useState('1000 TL VE ÜZERİ ÜCRETSİZ KARGO');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const campaignMessages = ['1000 TL VE ÜZERİ ÜCRETSİZ KARGO', 'SEÇİLİ ÜRÜNLERDE %20 İNDİRİM'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCampaignText((prevText) => 
        prevText === campaignMessages[0] ? campaignMessages[1] : campaignMessages[0]
      );
    }, 3000); // 3 saniyede bir değişir

    return () => clearInterval(interval); // Temizlik
  }, [campaignMessages]);

  return (
    <nav className={styles.container}>
      <span className={styles.campaign}>{campaignText}</span>
      <div className={styles.mainNav}>
        <Link className={styles.logo} to="/">DSK-TİCARET <GiSunglasses size={50} className={styles.glasses} /></Link>
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
