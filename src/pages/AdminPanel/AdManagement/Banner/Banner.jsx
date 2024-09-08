import React, { useEffect, useState } from 'react';
import styles from '../AdManagement.module.scss';
import { deleteBanner, getBanners } from '../../../../features/admin/adminService';
import { toast } from 'react-toastify';
import AddBannerForm from './AddBannerForm';

export default function Banner() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getBanners();
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message);
                }
                setBanners(result);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDeleteBanner = async (id) => {
        setDeleteLoading(id); // Set the loading state for the specific banner
        try {
            const response = await deleteBanner(id);
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message);
            }
            setBanners(result.banners); // Ensure to update with the correct key
            toast.success(result.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setDeleteLoading(null); // Reset loading state after the operation
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.bannerUpload}>
                <h1>Banner Reklamlar</h1>
                <AddBannerForm setBanners={setBanners} />
                {loading ? (
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
                                                disabled={deleteLoading === banner?.id}
                                            >
                                                {deleteLoading === banner?.id ? 'Siliniyor...' : 'Sil'}
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
