import React, { useState } from 'react';
import styles from './AddCampaign.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateCampaign } from '../../../features/admin/adminSlice';

export default function AddCampaign() {
  const { products, isLoading } = useSelector((state) => state.product);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [endDate, setEndDate] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');

  const currentDate = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
  const formattedDate = new Date(currentDate).toISOString().slice(0, 16);
  

  console.log(new Date(products[0]?.campaign?.endDate) > currentDate)
  const filteredProducts = products
    .filter((product) =>  !(new Date(product?.campaign?.endDate) > currentDate))
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((product) => !selectedProducts.includes(product._id));

  const handleAddProduct = (productId) => {
    setSelectedProducts((prev) => [...prev, productId]);
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((id) => id !== productId));
  };

  const dispatch = useDispatch()
  const handleStartCampaign = async() => {
    const data = {
      productIds: selectedProducts,
      endDate,
      discountPercentage
    }
    const resultAction = await dispatch(updateCampaign(data));
  
    if (updateCampaign.fulfilled.match(resultAction)) {
      setSelectedProducts([])
      setEndDate('')
      setDiscountPercentage('')
    };
  }
  const isFormValid = selectedProducts.length > 0 && endDate && discountPercentage;

  return (
    <div className={styles.container}>
      <div className={styles.leftBar}>
        <div className={styles.filterBar}>
          <div className={styles.options}>
            <div className={styles.optionGroup}>
              <label>Bitiş Tarihi</label>
              <input
                type="datetime-local"
                name="endDate"
                min={formattedDate}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className={styles.optionGroup}>
              <label>Yüzde:</label>
              <input
                type="number"
                id="discountPercentage"
                name="discountPercentage"
                min={0}
                max={100}
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
              />
            </div>
            <button
              disabled={!isFormValid} 
              onClick={handleStartCampaign}
              className={styles.startCampaign}
            >
              Kampanya Başlat
            </button>
          </div>

          <div className={styles.selectedProducts}>
            <table>
              <thead>
                <tr>
                  <th>Görsel</th>
                  <th>İsim</th>
                  <th>Kaldır</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((productId) => {
                  const selectedProduct = products.find((p) => p._id === productId);
                  return (
                    <tr key={productId}>
                      <td>
                        <img src={selectedProduct?.images[0]} alt={selectedProduct?.name} />
                      </td>
                      <td>{selectedProduct?.name}</td>
                      <td>
                        <button
                          onClick={() => handleRemoveProduct(productId)}
                          className={styles.removeProduct}
                        >
                          Kaldır
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles.rightBar}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Ürün İsmi..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>Görsel</th>
              <th>İsim</th>
              <th>Ekle</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  <img src={product.images[0]} alt={product.name} />
                </td>
                <td>{product.name}</td>
                <td>
                  <button onClick={() => handleAddProduct(product._id)}>Ekle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
