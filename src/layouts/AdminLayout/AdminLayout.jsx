import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // İkonları ekliyoruz
import styles from './AdminLayout.module.scss';
import { useSelector } from 'react-redux';

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector(
    (state) => state.auth
  );

  const navigation = useNavigate()
  useEffect(() => {
    if(!user || user.role !== 'admin') navigation("/")
  }, [user, navigation])
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
            <li><NavLink to="dashboard" className={(({isActive}) => isActive ? styles.activePage : '')}>Yönetim Paneli</NavLink></li>
            <li><NavLink to="products" className={(({isActive}) => isActive ? styles.activePage : '')}>Ürünlerim</NavLink></li>
            <li><NavLink to="promotional-messages" className={(({isActive}) => isActive ? styles.activePage : '')}>Reklam Mesajları</NavLink></li>
            <li><NavLink to="banner" className={(({isActive}) => isActive ? styles.activePage : '')}>Banner Reklamlar</NavLink></li>
            <li><NavLink to="add-product" className={(({isActive}) => isActive ? styles.activePage : '')}>Yeni Ürün Ekle</NavLink></li>
            <li><NavLink to="orders" className={(({isActive}) => isActive ? styles.activePage : '')}>Spiarişler</NavLink></li>
          </ul>
        </nav>
      </div>
      <div className={`${styles.content} ${isOpen ? styles.shrink : ''}`}>
        <Outlet />
      </div>
    </div>
  );
}
