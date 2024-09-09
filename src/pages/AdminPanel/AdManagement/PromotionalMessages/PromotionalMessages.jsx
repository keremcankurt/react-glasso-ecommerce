import React, { useState } from 'react';
import styles from '../AdManagement.module.scss';
import AddPromotionalMessageForm from './AddPromotionalMessageForm';
import { useDispatch, useSelector } from 'react-redux';
import { delPromotionalMessage } from '../../../../features/admin/adminSlice';

export default function PromotionalMessages() {
    const { promotionalMessages, isLoading } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    
    // Silinmekte olan mesajların ID'lerini tutan state
    const [deletingMessages, setDeletingMessages] = useState([]);

    const handleDeletePromotionalMessage = async (id) => {
        setDeletingMessages((prev) => [...prev, id]); // Silinen mesajı ekle
        await dispatch(delPromotionalMessage(id));
        setDeletingMessages((prev) => prev.filter(messageId => messageId !== id)); // Silme tamamlanınca çıkar
    };

    return (
        <div className={styles.container}>
            <div className={styles.promotionalMessages}>
                <h1>Reklam Mesajları</h1>
                <AddPromotionalMessageForm />
                {isLoading ? (
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
                                        <td>
                                            <button
                                                onClick={() => handleDeletePromotionalMessage(promotionalMessage.id)}
                                                disabled={deletingMessages.includes(promotionalMessage.id)}
                                            >
                                                {deletingMessages.includes(promotionalMessage.id) ? 'Siliniyor...' : 'Sil'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <span>Reklam mesajınız bulunmamaktadır.</span>
                    )
                )}
            </div>
        </div>
    );
}
