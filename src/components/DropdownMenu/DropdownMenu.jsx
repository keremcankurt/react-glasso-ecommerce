import React, { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

import styles from './DropdownMenu.module.scss'

export default function DropDownMenu() {
  
    const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const ref = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  const handleClose = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
        setIsDropDownOpen(false);
    }
  }

  const handleClick = () => {
    dispatch(logout());
  }
  
  return (
    <div ref={ref}>
      <button className={styles['settings']} onClick={handleDropDownToggle}>
            <FaUser className={styles['profile-picture']}/>
      </button>
      <div className={`${styles['dropdown-menu']} ${isDropDownOpen ? styles['open'] : ''}`}>
    
      <div className={styles["dropdown-menu-header"]}>
        <p>Merhaba, {user.name + " " + user.surname}</p>
      </div>
      <ul className={styles["dropdown-menu-list"]}>
        {
            user?.role === "admin" ?
            <li>
            <Link to="/admin" onClick={handleDropDownToggle}>Admin Paneli</Link>
            </li>
            :
            <li>
            <Link to="/account" onClick={handleDropDownToggle}>Hesabım</Link>
            </li>
        }
        <li>
          <Link to="/favorites"onClick={handleDropDownToggle}>Favorilerim</Link>
        </li>
        <li>
          <Link to="/" onClick={handleClick}>Çıkış Yap</Link>
        </li>
      </ul>
    </div>
    </div>
  );
}
