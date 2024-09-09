import React, { useState } from 'react';
import styles from '../AdManagement.module.scss';
import AddBannerForm from './AddBannerForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBanner } from '../../../../features/admin/adminSlice';

export default function Banner() {

    const { banners, isLoading } = useSelector((state) => state.product);
    const { isLoading: adminLoading } = useSelector((state) => state.admin);

    const dispatch = useDispatch();
    
    // Silinmekte olan banner'ın ID'sini tutan state
    const [deletingBannerId, setDeletingBannerId] = useState(null);

    const handleDeleteBanner = async (id) => {
        setDeletingBannerId(id); // Tıklanan banner'ın ID'sini state'e ekle
        await dispatch(deleteBanner(id));
        setDeletingBannerId(null); // Silme işlemi bitince temizle
    };

    return (
        <div className={styles.container}>
            <div className={styles.bannerUpload}>
                <h1>Banner Reklamlar</h1>
                <AddBannerForm />
                {isLoading ? (
                    <p>Yükleniyor...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Başlık</th>
                                <th>Görsel</th>
                                <th>Sil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banners && banners.length > 0 ? (
                                banners.map((banner) => (
                                    <tr key={banner?.id}>
                                        <td>{banner?.title}</td>
                                        <td><img src={banner?.imageUrl} alt={banner?.id} /></td>
                                        <td>
                                            <button 
                                                onClick={() => handleDeleteBanner(banner?.id)}
                                                disabled={deletingBannerId === banner?.id || adminLoading}
                                            >
                                                {deletingBannerId === banner?.id ? 'Siliniyor...' : 'Sil'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">Hiç banner bulunamadı.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
