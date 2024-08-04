import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>DSK-TİCARET</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.contentGroup}>
            <h2>Hesabım</h2>
            <div className={styles.contentItems}>
              <Link to='/login' className={styles.contentItem}>Giriş Yap</Link>
              <Link to='/register' className={styles.contentItem}>Kayıt Ol</Link>
              <Link to='/cart' className={styles.contentItem}>Sepetim</Link>
            </div>
          </div>
          <div className={styles.contentGroup}>
            <h2>Kurumsal</h2>
            <div className={styles.contentItems}>
              <Link to='/about' className={styles.contentItem}>Hakkımızda</Link>
              <Link to='/contact' className={styles.contentItem}>İletişim</Link>
            </div>
          </div>
          <div className={styles.contentGroup}>
            <h2>Müşteri Hizmetleri</h2>
            <div className={styles.contentItems}>
              <Link to='/kvkk' className={styles.contentItem}>KVKK</Link>
              <Link to='/onay' className={styles.contentItem}>Ticari Elektronik İleti Onayı</Link>
            </div>
          </div>
          <div className={styles.socialMediaIcons}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
          <div className={styles.creditCards}>
            <img  src='https://ideacdn.net/idea/mu/93/themes/selftpl_64f8849d75ae6/assets/uploads/footer_ssl_image.png?revision=7.2.8.3-12-1720796058' alt='iyzico'/>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <span>DSK-TİCARET © 2024 - Tüm Hakları Saklıdır.</span>
      </div>
    </footer>
  );
}
