import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {

  const { user } = useSelector(state => state.user)

  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(logout());
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>GLASSO</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.contentGroup}>
            <h2>Hesabım</h2>
            <div className={styles.contentItems}>
              <Link to='/cart' className={styles.contentItem}>Sepetim</Link>
              {
                user ?
                user.role === "admin" ?
                <>
                  <Link to='/admin' className={styles.contentItem}>Admin Paneli</Link>
                  <Link to="/" onClick={handleClick} className={styles.contentItem}>Çıkış Yap</Link>
                </>
                :
                <>
                  <Link to='/orders' className={styles.contentItem}>Siparişlerim</Link>
                  <Link to="/" onClick={handleClick} className={styles.contentItem}>Çıkış Yap</Link>
                </>
                :
                <>
                <Link to='/login' className={styles.contentItem}>Giriş Yap</Link>
                <Link to='/register' className={styles.contentItem}>Kayıt Ol</Link>
                </>
              }
            </div>
          </div>
          <div className={styles.contentGroup}>
            <h2>Kurumsal</h2>
            <div className={styles.contentItems}>
              <Link to='' className={styles.contentItem}>Hakkımızda</Link>
              <Link to='' className={styles.contentItem}>İletişim</Link>
            </div>
          </div>
          <div className={styles.contentGroup}>
            <h2>Müşteri Hizmetleri</h2>
            <div className={styles.contentItems}>
              <Link to='' className={styles.contentItem}>KVKK</Link>
              <Link to='' className={styles.contentItem}>Ticari Elektronik İleti Onayı</Link>
            </div>
          </div>
          <div className={styles.socialMediaIcons}>
            <a href="https://github.com/keremcankurt" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/kerem-can-kurt-730434260/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>

          <div className={styles.creditCards}>
            <img  src='https://ideacdn.net/idea/mu/93/themes/selftpl_64f8849d75ae6/assets/uploads/footer_ssl_image.png?revision=7.2.8.3-12-1720796058' alt='iyzico'/>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <span>GLASSO © 2024 - Tüm Hakları Saklıdır.</span>
      </div>
    </footer>
  );
}
