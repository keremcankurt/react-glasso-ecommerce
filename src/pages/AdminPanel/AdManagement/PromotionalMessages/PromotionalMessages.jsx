import React, { useEffect, useState } from 'react'
import styles from '../AdManagement.module.scss'
import { deletePromotionalMessage, getPromotionalMessages } from '../../../../features/admin/adminService'
import { toast } from 'react-toastify'
import AddPromotionalMessageForm from './AddPromotionalMessageForm'

export default function PromotionalMessages() {
    const [promotionalMessages, setPromotionalMessages] = useState([]);
    const [loading, setLoading] = useState(false); // Yükleniyor durumu

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Veri yüklenmeye başladığında yükleniyor durumunu true yap
            try {
                const response = await getPromotionalMessages();
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message);
                }
                setPromotionalMessages(result);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false); // Veri yüklenme tamamlandığında yükleniyor durumunu false yap
            }
        }
        fetchData();
    }, []);

    const handleDeletePromotionalMessage = async (id) => {
        try {
            const response = await deletePromotionalMessage(id);
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message);
            }
            setPromotionalMessages(result.messages);
            toast.success(result.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.promotionalMessages}>
                <h1>Reklam Mesajları</h1>
                <AddPromotionalMessageForm setPromotionalMessages={setPromotionalMessages} />
                {loading ? (
                     <p>Yükleniyor...</p>
                ) : (
                    promotionalMessages && promotionalMessages.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Mesaj</th>
                                    <th>Sil</th>
                                </tr>
                            </thead>
                            <tbody>
                                {promotionalMessages.map(promotionalMessage => (
                                    <tr key={promotionalMessage.id}>
                                        <td>{promotionalMessage.title}</td>
                                        <td><button onClick={() => handleDeletePromotionalMessage(promotionalMessage.id)}>Sil</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <span>Reklam mesajınız bulunmaktadır.</span>
                    )
                )}
            </div>
        </div>
    )
}
