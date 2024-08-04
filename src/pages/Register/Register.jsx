import React, { useEffect, useState } from 'react';
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    surname: '',
    password: '',
    passwordAgain: '',
    kvkk: false,
    campaign: false,
  });

  const { name, email, surname, password, passwordAgain, kvkk, campaign } = formData;

  const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isSuccess} = useSelector(
        (state) => state.auth
    );
    useEffect(() => {
        if (user) {
          navigate("/")
        }
        if(isSuccess){
            dispatch(reset())
            navigate("/login")
        }
    }, [user,navigate,isSuccess,dispatch]);

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== passwordAgain){
      toast.error("Şifreler uyuşmuyor.")
      return
    }
    const newFormData = {
      name,
      surname,
      email,
      password
    }
    dispatch(register(newFormData));
  }
  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerContent}>
        <div className={styles.registerLogo}>
          <h1>DSK-TİCARET</h1>
          <h2>HOŞGELDİNİZ</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.registerMainContent}>
          <div className={styles.registerInputs}>
            <div className={styles.fullName}>
              <input
                name="name"
                placeholder="İsim"
                type="text"
                value={name}
                onChange={handleOnChange}
                required
              />
              <input
                name="surname"
                placeholder="Soyad"
                type="text"
                value={surname}
                onChange={handleOnChange}
                required
              />
            </div>
            <input
              name="email"
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={handleOnChange}
              required
            />
            <input
              name="password"
              placeholder="Şifre"
              type="password"
              value={password}
              onChange={handleOnChange}
              required
            />
            <input
              name="passwordAgain"
              placeholder="Şifre"
              type="password"
              value={passwordAgain}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className={styles.checkboxes}>
            <div className={styles.checkboxItem}>
              <input
                name="campaign"
                type="checkbox"
                checked={campaign}
                onChange={handleOnChange}
                required
              />
              <label htmlFor="campaign">
                Kampanyalardan haberdar olmak için <Link to="/ticari-elektronik-onay">Ticari Elektronik İleti Onayı </Link>metnini okudum, onaylıyorum. Tarafınızdan gönderilecek ticari elektronik iletileri almak istiyorum.
              </label>
            </div>
            <div className={styles.checkboxItem}>
              <input
                name="kvkk"
                type="checkbox"
                checked={kvkk}
                onChange={handleOnChange}
                required
              />
              <label htmlFor="kvkk">
                <Link to="/uyelik-sozlesmesi">Üyelik sözleşmesini</Link> ve <Link to='/kvkk'>KVKK Aydınlatma Metnini</Link> okudum, kabul ediyorum.
              </label>
            </div>
          </div>
          <button type='submit' className={styles.registerButton} disabled={isLoading}>
          {!isLoading ? 'Kayıt Ol' : (
              <div className={styles.spinner}></div>
            )}
            </button>
            {/* <button type='button' className={styles.googleButton}>
                <img src='/googleIcon.svg' alt="Google icon" style={{ marginRight: '8px' }} />
                Google ile devam edin
              </button> */}
          <span className={styles.hasNotAccount}>
            Zaten hesabınız var mı? <Link to="/login">Giriş Yap</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
