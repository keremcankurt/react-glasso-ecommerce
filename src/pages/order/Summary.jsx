import React from 'react'
import styles from './Order.module.scss'
import { motion } from 'framer-motion';

export default function Summary({ cart, currentPhase, setCurrentPhase, address, iyzicoPayment, setIyzcioPayment }) {

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => {
            let price;
            const now = new Date();
            if (item.campaign && item.campaign.endDate > now) {
                price = item.price * (1 - (item.campaign.discountPercentage / 100));
            } else {
                price = item.price;
            }
            return total + price * item.quantity;
        }, 0);
    };

    const totalPrice = calculateTotalPrice().toFixed(2);

    // Adres bilgileri eksik mi kontrolü
    const isAddressComplete = address.name !== '' && 
                              address.surname !== '' && 
                              address.phone !== '' && 
                              address.city !== '' && 
                              address.district !== '' && 
                              address.town !== '' && 
                              address.addressDesc !== '';

    return (
        <div className={styles.summary}>
            <h3>Sepet Özeti</h3>

            <motion.div 
                className={styles['total']} 
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 1] }} 
                transition={{ duration: 0.5 }}
            >
                <span className={styles['total-text']}>Ürünlerin Toplamı:</span>
                <motion.span
                    className={styles['price']}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    key={totalPrice}
                >
                    {totalPrice} TL
                </motion.span>
            </motion.div>

            <div className={`${styles['total']} ${totalPrice >= 1000 ? styles.cargo : ''}`}>
                <span className={styles['total-text']}>Kargo Ücreti: </span>
                <span className={styles['price']}>59 TL</span>
            </div>

            <motion.div
                className={styles['total']}
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 1] }}
                transition={{ duration: 0.5 }}
            >
                <span className={styles['total-text']}>Toplam: </span>
                <motion.span
                    className={styles['total-price']}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    key={totalPrice}
                >
                    {totalPrice > 1000 ? totalPrice : (Number(totalPrice) + 59)} TL
                </motion.span>
            </motion.div>

            <div className={styles.iyzicoPayment}>
                <input
                    type='checkbox'
                    id='iyzicoPayment'
                    name='iyzicoPayment'
                    checked={iyzicoPayment}
                    onChange={(e) => {setIyzcioPayment(e.target.checked); currentPhase === 3 && setCurrentPhase(2)}}
                />
                <label htmlFor='iyzicoPayment'>3D Secure ile ödeme yapmak istiyorum.</label>
            </div>

            <div className={styles.buttonActions}>
                {currentPhase !== 1 && (
                    <button
                        onClick={() => setCurrentPhase(currentPhase - 1)}
                        className={styles['next-button']}
                    >
                        {currentPhase >= 2 ? 'Sepete Dön' : '< Adres Bilgilerine Geç'}
                    </button>
                )}

                {currentPhase === 1 && (
                    <button
                        onClick={() => setCurrentPhase(currentPhase + 1)}
                        className={styles['next-button']}
                    >
                    { "Adres Bilgilerine Geç"}
                    </button>
                )}

                {currentPhase === 2 && !iyzicoPayment && (
                    <button
                        onClick={() => setCurrentPhase(currentPhase + 1)}
                        className={styles['next-button']}
                        disabled={!isAddressComplete}
                    >
                        {'Kart Bilgilerine Geç'}
                    </button>
                )}


            </div>
        </div>
    );
}
