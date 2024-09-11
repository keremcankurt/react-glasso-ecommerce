import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { GiSunglasses } from 'react-icons/gi';
import { FaSearch } from 'react-icons/fa'; // Arama ikonu için
import { useDispatch, useSelector } from 'react-redux';
import DropDownMenu from '../DropdownMenu/DropdownMenu';
import CartDropdown from '../CartDropDown/CartDropDown';
import { getCart } from '../../features/user/userSlice';

export default function Header() {
  const [promotionText, setPromotionText] = useState('');
  const { promotionalMessages } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);
  
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const dispatch = useDispatch();
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    (cart && cart.length > 0) && dispatch(getCart(cart))
  },[dispatch])

  return (
    <nav className={styles.container}>
      {promotionText !== "" && (
        <span className={styles.campaign}>{promotionText.title}</span>
      )}
      <div className={styles.mainNav}>
        {isSearchBarVisible ? (
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Arama yapın..."
              className={styles.searchInput}
            />
            <button onClick={() => setIsSearchBarVisible(false)}>X</button>
          </div>
        ) : (
          <>
            <Link className={styles.logo} to="/">
              DSK-TİCARET <GiSunglasses size={50} className={styles.glasses} />
            </Link>
            {!isMobile && (
              <div className={styles.searchBar}>
                <input
                  type="text"
                  placeholder="Arama yapın..."
                  className={styles.searchInput}
                />
              </div>
            )}
              <div className={styles.headerRight}>
                <CartDropdown/>
                { isMobile && <button
                  className={styles.searchButton}
                  onClick={() => setIsSearchBarVisible(true)}
                >
                    <FaSearch className={styles.searchIcon} />
                </button>}
               { user ? <DropDownMenu />:
                <p>
                  <Link to='/login'>Giriş Yap</Link>&nbsp;|&nbsp;
                  <Link to='/register'>Kayıt Ol</Link>
                </p>}
              </div>
          </>
        )}
      </div>
    </nav>
  );
}
