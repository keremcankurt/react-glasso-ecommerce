import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './SummaryCard.module.scss';

const useCountUp = (value, duration = 2) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = Math.ceil(end / (duration * 60)); // Number of updates per second
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 1000 / 60); // Update at 60 FPS

    return () => clearInterval(timer);
  }, [value, duration]);

  return count;
};

export default function SummaryCard({ title, value, icon: Icon }) {
  const animatedValue = useCountUp(value);

  return (
    <div className={styles.summaryCard}>
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <motion.span
          className={styles.value}
          initial={{ opacity: 0, scale: 0.5 }} // Initial state
          animate={{ opacity: 1, scale: 1 }} // Animate to this state
          transition={{ duration: 0.5 }} // Duration of the animation
        >
          {animatedValue}
        </motion.span>
      </div>
      <div className={styles.icon}>
        <Icon />
      </div>
    </div>
  );
}
