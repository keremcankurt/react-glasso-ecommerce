import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from "./ForgotPassword.module.scss"
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, forgotPassword, reset } from '../../features/auth/authSlice';

export default function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordAgain: ""
    });
    const { email, password, passwordAgain } = formData;
    const search = useLocation().search;
    const token = new URLSearchParams(search).get("forgotPasswordToken");
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
    const handleChange = (e) => {
        setFormData({
          ...formData,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (email !== "") {
          const data = {
            email: email
          };
          dispatch(forgotPassword(data));
        } else {
          if(password === passwordAgain) {
            const data = {
            password: password,
            token: token
            }
            dispatch(changePassword(data));

        }else {
            toast.error("Şifreler eşleşmiyor.")
          }
        }
      };
  return (
    <div className={styles.mainContainer}>

    <div className={styles['forgotPassword-container']}>
        <Link to='/login' className={styles['forgotPasswordToLogin']}>Giriş ekranına dön</Link>
        <h1 className={styles['forgotPassword-logo']}>GLASSO</h1>
        <form className={styles['forgotPasswordForm']} onSubmit={onSubmit}>
        {token ? (
            <>
                <input name='password' value={password} onChange={handleChange} placeholder='Yeni Şifre' type='password' required/>
                <input name='passwordAgain' value={passwordAgain} onChange={handleChange} placeholder='Yeni Şifreyi Onayla' required type='password'/>
                {isLoading ? (
                  <button disabled className={styles['loading']}>Şifre Değiştiriliyor...</button>
                ):(
                  <button type='submit'>Şifreyi Değiştir</button>
                )}
            </>
        ):(
            <>
                <input name='email' value={email} onChange={handleChange} placeholder='Email' type='email' required/>
                {isLoading ? (
                    <button disabled className={styles['loading']}>Mail Tamamlanıyor...</button>
                ):(
                    <button type='submit'>Gönder</button>
                )}
                <span className={styles["forgotPassword-info"]}>
                    Şifrenizi yenilemek için bir mail alacaksınız.
                </span>
            </>
        )
    }
        </form>
    </div>
    </div>
  )
}
