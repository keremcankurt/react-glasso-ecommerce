import React, { useEffect, useState } from 'react'
import styles from "./Login.module.scss"
import { Link, useNavigate } from "react-router-dom" 
import { login } from '../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading} = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user,navigate]);
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <div className={styles.loginLogo}>
            <h1>DSK-TİCARET</h1>
            <h2>HOŞGELDİNİZ</h2>
        </div>
        <form onSubmit={onSubmit} className={styles.loginMainContent}>
            <div className={styles.loginInputs}>
              <input placeholder='E-mail' type='email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
              <input placeholder='Şifre' type='password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <Link className={styles.forgotPassword} to="/forgotpassword">Şifremi Unuttum</Link>
            <button className={styles.loginButton} type='submit' disabled={isLoading}>
              {!isLoading ? 'Giriş Yap' : (
              <div className={styles.spinner}></div>
            )}
              </button>
              {/* <button type='button' className={styles.googleButton}>
                <img src='/googleIcon.svg' alt="Google icon" style={{ marginRight: '8px' }} />
                Google ile devam edin
              </button> */}
            <span className={styles.hasNotAccount}>Hesabın yok mu? <Link to="/register">Kayıt Ol</Link></span>
        </form>
      </div>
    </div>
  )
}
