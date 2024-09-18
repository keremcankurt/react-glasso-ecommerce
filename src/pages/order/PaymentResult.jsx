import React from 'react'
import { motion } from 'framer-motion';
import styles from './Order.module.scss'
export default function PaymentResult({ paymentStatus }) {

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => {
          const delay = 1 + i * 0.5;
          return {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
              opacity: { delay, duration: 0.01 }
            }
          };
        }
      };
      if (paymentStatus === 'SUCCESS') {
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.successMessage}
          >
   <motion.svg
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
      >
        {/* Tik işaretinin çizildiği yol */}
        <motion.path
          d="M2 12l5 5L22 4" // Tik işareti yolu
          stroke="#00cc88"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
        />
      </motion.svg>
            <h2>Ödeme Başarılı!</h2>
            <button>Siparişlerime Göz At</button>
          </motion.div>
        );
      } else if (paymentStatus === 'FAILURE') {
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.failureMessage}
          >
            <motion.svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial="hidden"
            animate="visible"
          >
            {/* İlk çapraz çizgi */}
            <motion.line
              x1="4"
              y1="4"
              x2="20"
              y2="20"
              stroke="#ff0055"
              strokeWidth="2"
              strokeLinecap="round"
              variants={draw}
            />
            {/* İkinci çapraz çizgi */}
            <motion.line
              x1="20"
              y1="4"
              x2="4"
              y2="20"
              stroke="#ff0055"
              strokeWidth="2"
              strokeLinecap="round"
              variants={draw}
              transition={{ delay: 0.5 }} // İkinci çizginin animasyonu biraz gecikmeli
            />
          </motion.svg>
            <h2>Ödeme Başarısız!</h2>
            <button>Ödeme Sayfasına Dön</button>
          </motion.div>
        );
      }
      return null;
}
