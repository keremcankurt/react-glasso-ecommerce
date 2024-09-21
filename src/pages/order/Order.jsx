import React, { useEffect, useState } from 'react';
import styles from './Order.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProducts } from '../../features/product/productSlice';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { payment, paymentIyzico } from '../../features/payment/paymentService';
import { getCart, resetCart } from '../../features/user/userSlice';
import Products from './Products';
import Summary from './Summary';
import Empty from './Empty';
import AddressInformation from './AddressInformation';
import CreditCard from './CreditCard';
import { useLocation } from 'react-router-dom';
import PaymentResult from './PaymentResult';

const OrderPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentPhase, setCurrentPhase] = useState(1);
  const [iyzicoPayment, setIyzicoPayment] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [address, setAddress] = useState({
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    town: '',
    addressDesc: '',
  });
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    cvv: '',
    cardHolderName: ''
  });



  const { isLoading } = useSelector((state) => state.product);
  const { cart, user } = useSelector((state) => state.user);

  // Query'den status değerini çekiyoruz
  const searchParams = new URLSearchParams(location.search);
  const paymentStatus = searchParams.get('status');

  useEffect(() => {
    if(paymentStatus === "SUCCESS"){
      dispatch(resetCart())
      dispatch(getCart([]))
      
    }
    else{
      const cart = JSON.parse(localStorage.getItem('cart'));
      cart && cart.length > 0 && dispatch(getCart(cart));
    }
    dispatch(getProducts());
  }, [dispatch, paymentStatus]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const cart = localStorage.getItem('cart');

    const data = {
      cart: JSON.parse(cart),
      address,
      cardInfo,
    };

    if (user) {
      try {
        setPaymentLoading(true);
        let response;
        if(((currentPhase === 2 && iyzicoPayment)))
          response = await paymentIyzico(JSON.stringify(data));
        else
        {
          response = await payment(JSON.stringify(data));
        }
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message);
        }
        if(((currentPhase === 2 && iyzicoPayment)))
          window.location.href = result.paymentPageUrl;
        else {
          toast.success(result.message)
          setAddress({
            name: '',
            surname: '',
            phone: '',
            city: '',
            district: '',
            town: '',
            addressDesc: '',
          });
          
          setCardInfo({
            cardNumber: '',
            expirationMonth: '',
            expirationYear: '',
            cvv: '',
            cardHolderName: ''
          });
          dispatch(getProducts())
          dispatch(resetCart())
        }

      } catch (error) {
        toast.error(error.message);
      } finally {
        setPaymentLoading(false);
      }
    } else {
      toast.error('Sipariş vermek için giriş yapmalısınız.');
    }
  };



  const renderPaymentStatus = () => {
    return <PaymentResult paymentStatus={paymentStatus}/>
  };

  if (isLoading || paymentLoading) {
    return <LoadingSpinner />;
  }

  const isAddressComplete = address.name !== '' &&
                            address.surname !== '' &&
                            address.phone !== '' &&
                            address.city !== '' &&
                            address.district !== '' &&
                            address.town !== '' &&
                            address.addressDesc !== '';

  return (
    <div className={styles['order-page']}>
      {/* Eğer ödeme durumu varsa animasyonlu mesaj göster */}
      {paymentStatus ? (
        renderPaymentStatus()
      ) : (
        cart && cart.length > 0 ? (
          <div className={styles.container}>
            <div className={styles['order-container']}>
              <div className={styles['order-navbar']}>
                <h3 className={currentPhase === 1 ? styles.selected : ''}>Sepet</h3>
                <h3 className={currentPhase === 2 ? styles.selected : ''}>Adres Bilgileri</h3>
                {!iyzicoPayment && <h3 className={currentPhase === 3 ? styles.selected : ''}>Kart Bilgileri</h3>}
              </div>
              <div className={styles.content}>
                {currentPhase === 1 && <Products cart={cart} setCurrentPhase={setCurrentPhase} />}
                {currentPhase === 2 && <AddressInformation setAddress={setAddress} address={address} />}
                {!iyzicoPayment && currentPhase === 3 && <CreditCard cardInfo={cardInfo} setCardInfo={setCardInfo} />}
              </div>
            </div>

            <div className={styles.summarySection}>
              <Summary
                cart={cart}
                currentPhase={currentPhase}
                setCurrentPhase={setCurrentPhase}
                address={address}
                iyzicoPayment={iyzicoPayment}
                setIyzcioPayment={setIyzicoPayment}
              />
              
              {(iyzicoPayment && currentPhase === 2) || (!iyzicoPayment && currentPhase === 3) ? (
                <button
                  onClick={handleSubmit}
                  className={styles.paymentButton}
                  disabled={!isAddressComplete || (!iyzicoPayment && (!cardInfo.cardHolderName || !cardInfo.cardNumber || !cardInfo.cvv || !cardInfo.expirationMonth || !cardInfo.expirationYear))}
                >
                  Ödeme Yap
                </button>
              ) : null}
            </div>
          </div>
        ) : (
          <Empty />
        )
      )}
    </div>
  );
};

export default OrderPage;
