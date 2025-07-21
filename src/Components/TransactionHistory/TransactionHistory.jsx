import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './TransactionHistory.css';
import { useNavigate } from 'react-router-dom';

const TransactionHistory = () => {
    const { fetchUserTransactions, cancelTransaction } = useContext(ShopContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);
    const [cancelledId, setCancelledId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadTransactions = async () => {
            setLoading(true);
            const data = await fetchUserTransactions();
            setTransactions(data);
            setLoading(false);
        };
        loadTransactions();
    }, []);

    const handleCancelTransaction = async (transactionId) => {
        if (window.confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
            setCancelling(true);
            setCancelledId(transactionId);
            
            const result = await cancelTransaction(transactionId);
            
            if (result.success) {
                // Update status transaksi di state
                setTransactions(transactions.map(t => 
                    t._id === transactionId ? { ...t, status: 'cancelled' } : t
                ));
            } else {
                alert(`Gagal membatalkan pesanan: ${result.message}`);
            }
            
            setCancelling(false);
            setCancelledId(null);
        }
    };

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    if (loading) {
        return (
            <div className="transaction-history loading">
                <div className="loader"></div>
                <p>Memuat riwayat transaksi...</p>
            </div>
        );
    }

    return (
        <div className="transaction-history">
            <div className="transaction-header">
                <h1>Riwayat Transaksi</h1>
                <button onClick={() => navigate('/')} className="back-to-shop">
                    &larr; Kembali Berbelanja
                </button>
            </div>

            {transactions.length === 0 ? (
                <div className="no-transactions">
                    <div className="empty-cart-icon">🛒</div>
                    <h3>Belum Ada Transaksi</h3>
                    <p>Anda belum melakukan transaksi apapun. Mulai belanja sekarang!</p>
                    <button onClick={() => navigate('/')} className="shop-now-btn">
                        Belanja Sekarang
                    </button>
                </div>
            ) : (
                <div className="transactions-container">
                    {transactions.map(transaction => (
                        <div key={transaction._id} className="transaction-card">
                            <div className="transaction-header">
                                <h3>ID Transaksi: {transaction._id.substring(18)}</h3>
                                <span className={`status ${transaction.status}`}>
                                    {transaction.status === 'completed' ? 'Selesai' : 
                                     transaction.status === 'pending' ? 'Menunggu Konfirmasi' : 
                                     'Dibatalkan'}
                                </span>
                            </div>
                            
                            <div className="transaction-details">
                                <div className="detail-item">
                                    <span>Tanggal:</span>
                                    <span>{formatDate(transaction.date)}</span>
                                </div>
                                <div className="detail-item">
                                    <span>Metode Pembayaran:</span>
                                    <span className="bank-detail">
                                        <span className={`bank-logo ${transaction.bank.toLowerCase()}`}></span>
                                        {transaction.bank}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span>Total Pembayaran:</span>
                                    <span className="total-amount">
                                        Rp {transaction.totalAmount.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="transaction-items">
                                <h4>Produk yang Dibeli:</h4>
                                <ul>
                                    {transaction.items.map((item, index) => (
                                        <li key={index}>
                                            <div className="item-info">
                                                <div className="item-name">{item.name}</div>
                                                <div className="item-quantity">{item.quantity} x Rp {item.price.toLocaleString('id-ID')}</div>
                                            </div>
                                            <div className="item-total">
                                                Rp {(item.quantity * item.price).toLocaleString('id-ID')}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            {transaction.status === 'pending' && (
                                <div className="pending-actions">
                                    <button 
                                        className="cancel-btn"
                                        onClick={() => handleCancelTransaction(transaction._id)}
                                        disabled={cancelling && cancelledId === transaction._id}
                                    >
                                        {cancelling && cancelledId === transaction._id ? (
                                            <>
                                                <span className="spinner"></span> Membatalkan...
                                            </>
                                        ) : (
                                            "Batalkan Pesanan"
                                        )}
                                    </button>
                                    <button className="upload-btn">
                                        <input type="file" accept="image/*" style={{ display: 'none' }} />
                                        Upload Bukti Transfer
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;