import React from 'react';
import styles from './SkeletonCard.module.scss';

export default function SkeletonCard() {
  return (
    <div className={styles["skeleton-card"]}>
      <div className={styles["skeleton-img"]}>
      <div className={styles["skeleton-stars"]}></div>
      </div>
      <div className={styles["skeleton-brand"]}></div>
      <div className={styles["skeleton-name"]}></div>
      <div className={styles["skeleton-price"]}></div>
      <div className={styles["skeleton-buttons"]}>
        <div className={styles["skeleton-favorite"]}></div>
        <div className={styles["skeleton-cardButton"]}></div>
      </div>
    </div>
  );
}
