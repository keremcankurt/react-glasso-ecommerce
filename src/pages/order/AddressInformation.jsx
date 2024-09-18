import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import citiesData from '../../utils/Cities.json'; // Şehir verilerinin bulunduğu JSON dosyasını içe aktardık
import styles from './AddressInformation.module.scss';

export default function AddressInformation({ address, setAddress }) {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState(address.city);
  const [selectedDistrict, setSelectedDistrict] = useState(address.district);

  useEffect(() => {
    setCities(citiesData);
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const city = cities.find((c) => c.il === selectedCity);
      setDistricts(city?.ilceleri || []);
      setAddress({ ...address, city: selectedCity });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity, cities]);

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption?.value || null);
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption?.value || null);
    setAddress({ ...address, district: selectedOption?.value || '' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputsContainer}>
        <div className={styles.inputsGroup}>
            <input
            type="text"
            placeholder="İsim"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
            className={styles.input}
            />
            <input
            type="text"
            placeholder="Soyisim"
            value={address.surname}
            onChange={(e) => setAddress({ ...address, surname: e.target.value })}
            className={styles.input}
            />
            <input
            type="tel"
            placeholder="Telefon"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            className={styles.input}
            />
        </div>

        <div className={styles.inputsGroup}>
            <Select
            placeholder="Şehir Seçin"
            options={cities?.map((city) => ({ value: city.il, label: city.il }))}
            onChange={handleCityChange}
            value={selectedCity ? { value: selectedCity, label: selectedCity } : null}
            />
            <Select
            placeholder="İlçe Seçin"
            options={districts?.map((district) => ({ value: district, label: district }))}
            onChange={handleDistrictChange}
            isDisabled={!selectedCity}
            value={selectedDistrict ? { value: selectedDistrict, label: selectedDistrict } : null}
            />
            <input
            type="text"
            placeholder="Mahalle"
            value={address.town}
            onChange={(e) => setAddress({ ...address, town: e.target.value })}
            className={styles.input}
            />
        </div>

        <textarea
          placeholder="Adres Tarifi"
          value={address.addressDesc}
          onChange={(e) => setAddress({ ...address, addressDesc: e.target.value })}
          className={styles.textarea}
        />
      </div>
    </div>
  );
}
