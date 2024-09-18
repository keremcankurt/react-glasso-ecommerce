import React from 'react';
import Select from 'react-select';
import styles from './CreditCard.module.scss';

export default function CreditCard({ cardInfo, setCardInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({
      ...cardInfo,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setCardInfo({
      ...cardInfo,
      [name]: selectedOption.value,
    });
  };

  const months = Array.from({ length: 12 }, (_, i) => {
    const monthNumber = String(i + 1).padStart(2, '0');
    return { value: monthNumber, label: monthNumber };
  });

  const years = Array.from({ length: 60 }, (_, i) => {
    const yearNumber = String(i + 2025);
    return { value: yearNumber, label: yearNumber };
  });

  return (
    <div className={styles.container}>
      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label>Kart Numarası</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardInfo.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Kart Üzerindeki İsim</label>
          <input
            type="text"
            id="cardHolderName"
            name="cardHolderName"
            value={cardInfo.cardHolderName}
            onChange={handleChange}
            placeholder="İsminizi Giriniz"
          />
        </div>
        <div className={styles.multiGroup}>
          <div className={styles.expirationDate}>
            <label>Son Kullanma Tarihi</label>
            <div className={styles.selectGroup}>
              <Select
                placeholder="Ay"
                name="expirationMonth"
                options={months}
                onChange={handleSelectChange}
                value={
                  cardInfo?.expirationMonth
                    ? { value: cardInfo?.expirationMonth, label: cardInfo?.expirationMonth }
                    : null
                }
              />
              <Select
                placeholder="Yıl"
                name="expirationYear"
                options={years}
                onChange={handleSelectChange}
                value={
                  cardInfo?.expirationYear
                    ? { value: cardInfo?.expirationYear, label: cardInfo?.expirationYear }
                    : null
                }
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>CVV</label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              value={cardInfo.cvv}
              onChange={handleChange}
              maxLength={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
