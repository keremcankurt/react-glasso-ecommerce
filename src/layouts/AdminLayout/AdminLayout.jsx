import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // İkonları ekliyoruz
import styles from './AdminLayout.module.scss';
import { useSelector } from 'react-redux';

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isSuccess, isError } = useSelector(
    (state) => state.user
  );

  const navigation = useNavigate()
  useEffect(() => {
    if(isError) navigation("/")
    if(!isSuccess) return
    if( !user || user.role !== 'admin') navigation("/")
  }, [user, navigation, isSuccess, isError])
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.adminLayout}>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <button className={styles.toggleBtn} onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav>
          <ul>
            <li><NavLink to="" end className={(({isActive}) => isActive ? styles.activePage : '')}>Yönetim Paneli</NavLink></li>
            <li><NavLink to="products" className={(({isActive}) => isActive ? styles.activePage : '')}>Ürünlerim</NavLink></li>
            <li><NavLink to="add-product" className={(({isActive}) => isActive ? styles.activePage : '')}>Yeni Ürün Ekle</NavLink></li>
            <li><NavLink to="add-campaign" className={(({isActive}) => isActive ? styles.activePage : '')}>Kampanya Düzenle</NavLink></li>
            <li><NavLink to="promotional-messages" className={(({isActive}) => isActive ? styles.activePage : '')}>Reklam Mesajları</NavLink></li>
            <li><NavLink to="banner" className={(({isActive}) => isActive ? styles.activePage : '')}>Banner Reklamlar</NavLink></li>
            <li><Link to="/">Siteye Dön</Link></li>
          </ul>
        </nav>
      </div>
      <div className={`${styles.content} ${isOpen ? styles.shrink : ''}`}>
        <Outlet />
      </div>
    </div>
  );
}
